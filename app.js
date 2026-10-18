/* Bento Feedback — rendering + interactive dotted globe. No dependencies. */
;(function () {
  'use strict'

  const FEEDBACK = window.FEEDBACK
  const COUNTRIES = window.COUNTRIES
  const CATEGORIES = window.CATEGORIES
  const CHANNELS = window.CHANNELS

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ---------- tiny DOM helper ---------- */
  function h(tag, props, ...kids) {
    const n = document.createElement(tag)
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (k === 'class') n.className = v
        else if (k === 'style') n.style.cssText = v
        else if (k === 'html') n.innerHTML = v
        else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v)
        else if (v !== null && v !== undefined) n.setAttribute(k, v)
      }
    }
    for (const kid of kids.flat()) {
      if (kid === null || kid === undefined || kid === false) continue
      n.append(kid.nodeType ? kid : document.createTextNode(String(kid)))
    }
    return n
  }

  /* ---------- derived stats ---------- */
  const catCount = {}
  for (const c of CATEGORIES) catCount[c.id] = 0
  for (const f of FEEDBACK) for (const c of f.cats) catCount[c]++

  const countryCount = {}
  for (const f of FEEDBACK) if (f.country) countryCount[f.country] = (countryCount[f.country] || 0) + 1
  const countryList = Object.entries(countryCount)
    .map(([code, n]) => ({ code, n, ...COUNTRIES[code] }))
    .sort((a, b) => b.n - a.n || a.name.localeCompare(b.name))

  const channelCount = {}
  for (const ch of CHANNELS) channelCount[ch.id] = FEEDBACK.filter((f) => f.channel === ch.id).length

  const uniqueBuilders = new Set(FEEDBACK.map((f) => f.name + '|' + (f.country || ''))).size
  const npsSplit = {
    promoter: FEEDBACK.filter((f) => f.nps === 'promoter').length,
    passive: FEEDBACK.filter((f) => f.nps === 'passive').length,
    detractor: FEEDBACK.filter((f) => f.nps === 'detractor').length
  }
  const npsScore = Math.round((npsSplit.promoter - npsSplit.detractor) / FEEDBACK.length * 100)

  /* ---------- filter state ---------- */
  const filter = { cat: null, country: null }

  /* ================= HERO STATS ================= */
  const stats = [
    { n: FEEDBACK.length, label: 'feedback responses', cls: 'c-red' },
    { n: uniqueBuilders, label: 'unique builders', cls: 'c-purple' },
    { n: countryList.length, label: 'countries', cls: 'c-blue' },
    { n: CATEGORIES.length, label: 'themes we sorted it into', cls: 'c-yellow' },
    { n: '100%', label: 'said something nice', cls: 'c-green' }
  ]
  document.getElementById('hero-stats').append(
    ...stats.map((s) => h('div', { class: `stat ${s.cls}` }, h('b', null, s.n), h('span', null, s.label)))
  )

  // counts in the copy stay in sync with the data
  const heroCount = document.getElementById('hero-count')
  if (heroCount) heroCount.textContent = uniqueBuilders
  const allTitle = document.getElementById('all-title')
  if (allTitle) allTitle.textContent = `All ${FEEDBACK.length} responses`
  const voiceSub = document.getElementById('voice-count')
  if (voiceSub) voiceSub.textContent = `Praise and gripes from all ${FEEDBACK.length} responses, verbatim (typos lovingly preserved).`

  /* ================= COUNTRY BARS ================= */
  const barsBox = document.getElementById('country-bars')
  const maxCountry = countryList[0].n
  const barEls = {}
  for (const c of countryList) {
    const bar = h(
      'button',
      {
        class: 'cbar',
        type: 'button',
        title: `${c.n} response${c.n > 1 ? 's' : ''} from ${c.name}`,
        onclick: () => toggleCountry(c.code)
      },
      h('span', { class: 'flag' }, c.flag),
      h('span', null, c.name),
      h('span', { class: 'count' }, `${c.n}×`),
      h('span', { class: 'meter' }, h('i', { style: `width:${(c.n / maxCountry) * 100}%` }))
    )
    barEls[c.code] = bar
    barsBox.append(bar)
  }
  document.getElementById('globe-note').innerHTML =
    `<b>${FEEDBACK.length}</b> responses · <b>${countryList.length}</b> countries · ` +
    (() => {
      const missing = FEEDBACK.filter((f) => !f.country)
      return missing.length
        ? `${missing.length === 1 ? 'one builder' : missing.length + ' builders'} didn't say where ${missing.length === 1 ? 'they are' : 'they are'} (${missing
            .map((f) => f.name)
            .join(', ')} — 🏳️, not on the globe)`
        : 'everyone said where they are'
    })()

  /* ================= THEME CARDS ================= */
  const themeBox = document.getElementById('theme-grid')
  const themeEls = {}
  const maxCat = Math.max(...Object.values(catCount))
  for (const c of CATEGORIES) {
    const card = h(
      'button',
      {
        class: 'theme-card',
        type: 'button',
        style: `--tc:${c.color}`,
        onclick: () => toggleCat(c.id)
      },
      h('span', { class: 'tcount' }, catCount[c.id]),
      h('span', { class: 'emoji' }, c.emoji),
      h('h4', null, c.label),
      h('p', null, c.blurb),
      h('span', { class: 'mini' }, h('i', { style: `width:${(catCount[c.id] / maxCat) * 100}%` }))
    )
    themeEls[c.id] = card
    themeBox.append(card)
  }

  /* ================= NPS GAUGE ================= */
  ;(function renderNps() {
    const box = document.getElementById('nps-gauge')
    const total = FEEDBACK.length
    // semicircle: -100 .. +100 mapped to 180deg .. 360deg
    const R = 90
    const cx = 110
    const cy = 110
    const polar = (deg, r) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)]
    const arc = (a1, a2, r, color, width) => {
      const [x1, y1] = polar(a1, r)
      const [x2, y2] = polar(a2, r)
      const large = Math.abs(a2 - a1) > 180 ? 1 : 0
      return `<path d="M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`
    }
    // gauge zones: detractors 180..234, passives 234..306, promoters 306..360 (visual thirds)
    const angle = 180 + ((npsScore + 100) / 200) * 180
    const [nx, ny] = polar(angle, R - 4)
    const [tx, ty] = polar(angle, 34)
    const [bx, by] = polar(angle + 180, 18)
    const zoneW = 13
    box.innerHTML = `
      <svg viewBox="0 0 220 132" role="img" aria-label="NPS gauge reading ${npsScore}">
        ${arc(182, 238, R, '#ec3750', zoneW)}
        ${arc(244, 296, R, '#f1c40f', zoneW)}
        ${arc(302, 358, R, '#33d6a6', zoneW)}
        <line x1="${bx}" y1="${by}" x2="${tx}" y2="${ty}" stroke="#f6f2e9" stroke-width="4" stroke-linecap="round"/>
        <circle cx="${cx}" cy="${cy}" r="8" fill="#f6f2e9"/>
        <circle cx="${nx}" cy="${ny}" r="4" fill="#f6f2e9" opacity="0.9"/>
      </svg>
      <div class="nps-num">${npsScore}</div>
      <div class="split">
        <span>🎉 <b>${npsSplit.promoter}</b> promoters</span>
        <span>🙂 <b>${npsSplit.passive}</b> passives</span>
        <span>😕 <b>${npsSplit.detractor}</b> detractor</span>
      </div>
      <p class="panel-sub" style="margin-top:10px">Promoters − detractors, 0–100 scale. “Great” territory: 50+.</p>`
  })()

  /* ================= CHANNEL BARS ================= */
  const chBox = document.getElementById('channel-bars')
  const maxCh = Math.max(...Object.values(channelCount))
  for (const ch of CHANNELS) {
    const n = channelCount[ch.id]
    chBox.append(
      h(
        'div',
        { class: 'chrow' },
        h('div', { class: 'chead' }, h('b', null, `${ch.label}`), h('span', null, `${n} · ${Math.round((n / FEEDBACK.length) * 100)}%`)),
        h('span', { class: 'chtrack' }, h('i', { style: `width:${(n / maxCh) * 100}%;background:${ch.color}` })),
        h('div', { class: 'chdetail' }, ch.detail)
      )
    )
  }

  /* ================= FILTER CHIPS ================= */
  const chipBox = document.getElementById('filter-chips')
  const chipEls = {}
  const allChip = h(
    'button',
    { class: 'chip active', type: 'button', onclick: () => { filter.cat = null; applyFilters() } },
    `All themes (${FEEDBACK.length})`
  )
  chipEls[null] = allChip
  chipBox.append(allChip)
  for (const c of CATEGORIES) {
    const chip = h('button', { class: 'chip', type: 'button', onclick: () => toggleCat(c.id) }, `${c.emoji} ${c.label} (${catCount[c.id]})`)
    chipEls[c.id] = chip
    chipBox.append(chip)
  }

  /* ================= VOICE WALL ================= */
  const wall = document.getElementById('voice-wall')
  const quoteEls = {}
  for (const f of FEEDBACK) {
    const c = f.country ? COUNTRIES[f.country] : null
    const tags = f.cats.map((id) => {
      const cat = CATEGORIES.find((x) => x.id === id)
      return h(
        'button',
        { class: 'qt', type: 'button', style: `color:${cat.color};border-color:${cat.color}66`, onclick: () => toggleCat(id) },
        `${cat.emoji} ${cat.label}`
      )
    })
    const card = h(
      'article',
      { class: 'quote', 'data-cat': f.cats.join(' '), 'data-country': f.country || '' },
      h('p', { class: 'q' }, f.well),
      h(
        'p',
        { class: 'improve' },
        h('b', null, 'How can we improve?'),
        f.improve
      ),
      h(
        'div',
        { class: 'who' },
        h('b', null, c ? `${c.flag} ${f.name}` : f.name),
        c ? h('span', null, c.name) : h('span', null, 'location not given')
      ),
      h('div', { class: 'tags' }, tags)
    )
    quoteEls[f.id] = card
    wall.append(card)
  }

  /* ================= RESPONSE CARDS ================= */
  const cardBox = document.getElementById('response-cards')
  const respEls = {}
  for (const f of FEEDBACK) {
    const c = f.country ? COUNTRIES[f.country] : null
    const links = h('div', { class: 'links' })
    if (f.url) {
      const short = f.url.replace(/^https?:\/\//, '').replace(/^github\.com\//, 'gh: ').replace(/\/tree\/.*$/, '')
      links.append(h('div', { class: 'repo' }, '🔗 ', h('a', { href: f.url, target: '_blank', rel: 'noopener' }, short)))
    }
    if (f.live) {
      const short = f.live.replace(/^https?:\/\//, '').replace(/\/$/, '')
      links.append(h('div', { class: 'repo' }, '🌍 ', h('a', { href: f.live, target: '_blank', rel: 'noopener' }, short)))
    }
    if (!links.childNodes.length) links.remove()
    const card = h(
      'article',
      { class: 'rcard', 'data-cat': f.cats.join(' '), 'data-country': f.country || '' },
      h(
        'div',
        { class: 'top' },
        h('span', { class: 'who' }, h('span', { class: 'flag' }, c ? c.flag : '🏳️'), f.name, h('small', null, c ? ` · ${c.name}` : ' · unknown'))
      ),
      h(
        'dl',
        null,
        h('dt', null, 'How can we improve?'),
        h('dd', { class: 'dd-improve' }, f.improve),
        h('dt', null, 'What are we doing well?'),
        h('dd', { class: 'dd-well' }, f.well),
        h('dt', null, 'How did you hear about this?'),
        h('dd', { class: 'dd-heard' }, f.heard)
      ),
      h('div', { class: 'tags' }, f.cats.map((id) => {
        const cat = CATEGORIES.find((x) => x.id === id)
        return h('span', { class: 'qt', style: `color:${cat.color};border-color:${cat.color}66;cursor:default` }, cat.label)
      })),
      links
    )
    respEls[f.id] = card
    cardBox.append(card)
  }

  /* ================= FILTERING ================= */
  const statusLine = document.getElementById('filter-status')

  function toggleCat(id) {
    filter.cat = filter.cat === id ? null : id
    applyFilters()
  }
  function toggleCountry(code) {
    filter.country = filter.country === code ? null : code
    applyFilters()
  }

  function matches(f) {
    if (filter.cat && !f.cats.includes(filter.cat)) return false
    if (filter.country && f.country !== filter.country) return false
    return true
  }

  function applyFilters() {
    // chips
    for (const [id, el] of Object.entries(chipEls)) el.classList.toggle('active', (id === 'null' ? null : id) === filter.cat)
    // theme cards
    for (const [id, el] of Object.entries(themeEls)) el.classList.toggle('active', id === filter.cat)
    // country bars
    for (const [code, el] of Object.entries(barEls)) el.classList.toggle('active', code === filter.country)

    let shown = 0
    for (const f of FEEDBACK) {
      const ok = matches(f)
      if (ok) shown++
      quoteEls[f.id].style.display = ok ? '' : 'none'
      respEls[f.id].classList.toggle('hidden', !ok)
    }

    const parts = []
    if (filter.cat) {
      const cat = CATEGORIES.find((c) => c.id === filter.cat)
      parts.push(`theme ${cat.emoji} ${cat.label}`)
    }
    if (filter.country) parts.push(`📍 ${COUNTRIES[filter.country].name}`)
    if (parts.length) {
      statusLine.innerHTML = ''
      statusLine.append(
        document.createTextNode(`Showing ${shown} of ${FEEDBACK.length} responses — ` + parts.join(' + ')),
        h('button', { type: 'button', onclick: () => { filter.cat = null; filter.country = null; applyFilters() } }, 'clear ✕')
      )
      statusLine.hidden = false
    } else {
      statusLine.hidden = true
    }
    if (window.__globe) window.__globe.highlight(filter.country)
  }

  /* ================= THE GLOBE ================= */
  function initGlobe() {
    const canvas = document.getElementById('globe-canvas')
    const stage = canvas.parentElement
    const tip = document.getElementById('globe-tip')
    const hint = document.getElementById('globe-hint')
    if (!canvas.getContext) return

    // parse land dots once
    const raw = (window.LAND_DOTS || '').split(';')
    const land = new Float32Array(raw.length * 2)
    for (let i = 0; i < raw.length; i++) {
      const [la, lo] = raw[i].split(' ')
      land[i * 2] = parseFloat(la)
      land[i * 2 + 1] = parseFloat(lo)
    }

    const ctx = canvas.getContext('2d')
    let W = 0
    let H = 0
    let R = 0
    let cx = 0
    let cy = 0
    const rot = { lam: -30, phi: 18 } // degrees; lam = longitude facing us
    let dragging = false
    let last = null
    let moved = 0
    let hover = null
    let highlighted = null
    let lastInteraction = 0

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = stage.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      R = Math.min(W, H) * 0.42
      cx = W / 2
      cy = H / 2
    }
    new ResizeObserver(resize).observe(stage)
    resize()

    const rad = (d) => (d * Math.PI) / 180
    function project(lat, lon) {
      const p = rad(lat)
      const l = rad(lon) - rad(rot.lam)
      const p0 = rad(rot.phi)
      const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l)
      return {
        x: cx + R * (Math.cos(p) * Math.sin(l)),
        y: cy - R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)),
        v: cosc
      }
    }

    // markers from the data
    const markers = countryList.map((c) => ({ ...c }))

    function draw(now) {
      ctx.clearRect(0, 0, W, H)

      // ocean sphere
      const grad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R)
      grad.addColorStop(0, '#17223a')
      grad.addColorStop(1, '#0a101c')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
      ctx.strokeStyle = 'rgba(246,242,233,0.14)'
      ctx.lineWidth = 1
      ctx.stroke()

      // graticule
      ctx.strokeStyle = 'rgba(246,242,233,0.07)'
      ctx.lineWidth = 1
      for (let lon = -180; lon < 180; lon += 30) strokeMeridian(lon)
      for (let lat = -60; lat <= 60; lat += 30) strokeParallel(lat)

      // land dots
      ctx.fillStyle = 'rgba(246,242,233,0.30)'
      const s = Math.max(1.6, R * 0.012)
      for (let i = 0; i < land.length; i += 2) {
        const p = project(land[i], land[i + 1])
        if (p.v <= 0.02) continue
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s)
      }

      // markers
      const pulse = 1 + 0.18 * Math.sin(now / 380)
      for (const m of markers) {
        const p = project(m.lat, m.lon)
        if (p.v <= 0.03) continue
        const active = highlighted === m.code
        const base = 7 + m.n * 4
        const r = base * (active ? 1.25 : 1)
        // halo
        ctx.beginPath()
        ctx.arc(p.x, p.y, r * (active ? 2.2 : 1.7) * pulse, 0, Math.PI * 2)
        ctx.fillStyle = active ? 'rgba(236,55,80,0.30)' : 'rgba(236,55,80,0.16)'
        ctx.fill()
        // core
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = active ? '#ff6b7d' : '#ec3750'
        ctx.fill()
        ctx.lineWidth = 2
        ctx.strokeStyle = 'rgba(246,242,233,0.85)'
        ctx.stroke()
        // count
        ctx.fillStyle = '#fff'
        ctx.font = `bold ${Math.round(r * 1.05)}px 'Phantom Sans', sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(m.n), p.x, p.y + 0.5)
        // label
        if (p.v > 0.35) {
          ctx.font = "bold 11px 'Phantom Sans', sans-serif"
          ctx.fillStyle = 'rgba(246,242,233,0.75)'
          ctx.fillText(`${m.flag} ${m.code}`, p.x, p.y + r + 12)
        }
        m._x = p.x
        m._y = p.y
        m._r = r
      }

      if (hover && hover._x !== undefined) {
        ctx.beginPath()
        ctx.arc(hover._x, hover._y, hover._r + 6, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(246,242,233,0.9)'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    function strokeMeridian(lon) {
      ctx.beginPath()
      let pen = false
      for (let lat = -90; lat <= 90; lat += 4) {
        const p = project(lat, lon)
        if (p.v > 0) {
          if (pen) ctx.lineTo(p.x, p.y)
          else {
            ctx.moveTo(p.x, p.y)
            pen = true
          }
        } else pen = false
      }
      ctx.stroke()
    }
    function strokeParallel(lat) {
      ctx.beginPath()
      let pen = false
      for (let lon = -180; lon <= 180; lon += 4) {
        const p = project(lat, lon)
        if (p.v > 0) {
          if (pen) ctx.lineTo(p.x, p.y)
          else {
            ctx.moveTo(p.x, p.y)
            pen = true
          }
        } else pen = false
      }
      ctx.stroke()
    }

    function markerAt(x, y) {
      let best = null
      let bestD = Infinity
      for (const m of markers) {
        if (m._x === undefined) continue
        const d = Math.hypot(m._x - x, m._y - y)
        if (d < Math.max(m._r + 10, 16) && d < bestD) {
          best = m
          bestD = d
        }
      }
      return best
    }

    function pointerPos(e) {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    canvas.addEventListener('pointerdown', (e) => {
      dragging = true
      moved = 0
      last = pointerPos(e)
      canvas.setPointerCapture(e.pointerId)
      canvas.classList.add('dragging')
      hint.style.opacity = '0'
    })
    canvas.addEventListener('pointermove', (e) => {
      const p = pointerPos(e)
      if (dragging && last) {
        const k = 0.28 * (300 / Math.max(R, 1))
        moved += Math.hypot(p.x - last.x, p.y - last.y)
        rot.lam -= (p.x - last.x) * k * 1.6
        rot.phi = Math.max(-80, Math.min(80, rot.phi + (p.y - last.y) * k * 1.6))
        last = p
        lastInteraction = performance.now()
        hideTip()
        return
      }
      const m = markerAt(p.x, p.y)
      if (m !== hover) {
        hover = m
        if (m) showTip(m)
        else hideTip()
      } else if (m) {
        tip.style.left = m._x + 'px'
        tip.style.top = m._y + 'px'
      }
      canvas.style.cursor = m ? 'pointer' : dragging ? 'grabbing' : 'grab'
    })
    canvas.addEventListener('pointerup', (e) => {
      dragging = false
      canvas.classList.remove('dragging')
      canvas.releasePointerCapture?.(e.pointerId)
      lastInteraction = performance.now()
      // a real click (barely moved) on a marker → filter
      const p = pointerPos(e)
      const m = moved < 6 ? markerAt(p.x, p.y) : null
      if (m) {
        toggleCountry(m.code)
        document.getElementById('voices').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
      }
    })
    canvas.addEventListener('pointerleave', () => {
      hover = null
      hideTip()
    })

    function showTip(m) {
      const names = FEEDBACK.filter((f) => f.country === m.code).map((f) => f.name)
      tip.innerHTML = `<b>${m.flag} ${m.name}</b> — ${m.n} response${m.n > 1 ? 's' : ''} (${[...new Set(names)].join(', ')})<br><span style="opacity:.7">click to filter</span>`
      tip.hidden = false
      tip.style.left = m._x + 'px'
      tip.style.top = m._y + 'px'
    }
    function hideTip() {
      tip.hidden = true
    }

    function tick(now) {
      if (!reduceMotion && !dragging && now - lastInteraction > 1800) {
        rot.lam += 0.045
      }
      draw(now)
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    window.__globe = {
      highlight(code) {
        highlighted = code
        if (code && COUNTRIES[code]) {
          // gently swing the globe to show that country
          rot.lam = -COUNTRIES[code].lon
          rot.phi = Math.max(-60, Math.min(60, COUNTRIES[code].lat))
          lastInteraction = performance.now()
        }
      }
    }
  }

  try {
    initGlobe()
  } catch (err) {
    console.error('globe failed', err)
    document.querySelector('.globe-stage').innerHTML =
      '<p style="padding:30px;text-align:center;color:#9aa7b8">Globe unavailable — the country list on the right still has everything.</p>'
  }

  applyFilters()
})()
