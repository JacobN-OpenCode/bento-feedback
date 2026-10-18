/* Bento Feedback — code gate.
 * Only a SHA-256 fingerprint of the code lives in this repo. The code itself is stored
 * in Jacob's macOS Keychain (item: bento-feedback.navaratne.uk) and nowhere else.
 * Auth state is deliberately memory-only: no cookies, no storage — every reload re-locks.
 * The site's scripts (data.js / land.js / app.js) are only injected after a successful
 * unlock, so none of the feedback is even in the DOM until you're in. */
;(function () {
  'use strict'

  const HASH = '3b86f50d8f57741af3844c7b4d22f0b98f0f4f81a8a19df8518eec692935156b'

  const gate = document.getElementById('gate')
  const form = document.getElementById('gate-form')
  const input = document.getElementById('gate-input')
  const error = document.getElementById('gate-error')

  function fail(msg) {
    error.textContent = msg || 'Wrong code — try again.'
    error.hidden = false
    gate.classList.remove('shake')
    void gate.offsetWidth // restart the animation
    gate.classList.add('shake')
    input.select()
  }

  async function sha256hex(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
  }

  function load(src, done) {
    const s = document.createElement('script')
    s.src = src
    if (done) s.onload = done
    document.body.append(s)
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const code = input.value.trim()
    if (!code) return

    // crypto.subtle only exists in a secure context — http:// would silently break the gate
    if (!window.isSecureContext || !crypto.subtle) {
      return fail('Unlocking needs HTTPS — visit https://feedback.navaratne.uk instead.')
    }

    let hex = ''
    try {
      hex = await sha256hex(code)
    } catch {
      return fail()
    }
    if (hex !== HASH) return fail()

    // unlocked: drop the gate, then build the site for the first time
    gate.remove()
    load('data.js', () => load('land.js', () => load('app.js')))
  })

  input.focus()
})()
