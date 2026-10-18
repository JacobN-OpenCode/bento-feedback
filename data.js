// Bento feedback form — 34 responses (full set, transcribed from the Airtable PDF export),
// categorised by hand. Review status is deliberately NOT stored here — it's private.
// nps = promoter / passive / detractor, my read of each response's tone (not review status).
window.COUNTRIES = {
  SE: { name: 'Sweden', lat: 59.33, lon: 18.07, flag: '🇸🇪' },
  CA: { name: 'Canada', lat: 56.13, lon: -106.35, flag: '🇨🇦' },
  IN: { name: 'India', lat: 20.59, lon: 78.96, flag: '🇮🇳' },
  EG: { name: 'Egypt', lat: 26.82, lon: 30.8, flag: '🇪🇬' },
  MX: { name: 'Mexico', lat: 23.63, lon: -102.55, flag: '🇲🇽' },
  NP: { name: 'Nepal', lat: 28.39, lon: 84.12, flag: '🇳🇵' },
  US: { name: 'United States', lat: 37.09, lon: -95.71, flag: '🇺🇸' },
  BR: { name: 'Brazil', lat: -14.24, lon: -51.93, flag: '🇧🇷' },
  ZW: { name: 'Zimbabwe', lat: -19.02, lon: 29.15, flag: '🇿🇼' },
  GB: { name: 'United Kingdom', lat: 55.38, lon: -3.44, flag: '🇬🇧' },
  MD: { name: 'Moldova', lat: 47.41, lon: 28.37, flag: '🇲🇩' },
  JP: { name: 'Japan', lat: 36.2, lon: 138.25, flag: '🇯🇵' }
}

window.CATEGORIES = [
  { id: 'love', label: 'Good vibes', emoji: '🍣', color: '#33d6a6', blurb: 'Plain love for the YSWS — the tone, the sites, the crew.' },
  { id: 'prizes', label: 'Prizes & sushi', emoji: '💰', color: '#f1c40f', blurb: 'Sushi money, the plushie, and everyone asking for more of it.' },
  { id: 'learn', label: 'Guides & resources', emoji: '📚', color: '#338eda', blurb: 'Tutorials, example sites, an FAQ, a compiled resource library.' },
  { id: 'community', label: 'Community & staff', emoji: '🤝', color: '#a633d6', blurb: 'Friendly admins, fast replies, the Slack crowd.' },
  { id: 'process', label: 'Process & tooling', emoji: '🚦', color: '#ff8c37', blurb: 'Reviews, Hackatime & Lapse, ID checks, submission UX.' },
  { id: 'time', label: 'More time', emoji: '⏳', color: '#ec3750', blurb: 'Longer deadlines, one more day to go all out.' },
  { id: 'again', label: 'Bring it back', emoji: '🔄', color: '#5bc0de', blurb: '“make v2” — the sequel crew.' }
]

window.FEEDBACK = [
  {
    id: 1, name: 'Jeremi', country: null, nps: 'promoter',
    improve: 'N/A :)', well: 'Everyting!', heard: 'Via the Hack Club projects page',
    channel: 'site', cats: ['love'],
    url: 'https://github.com/SurArc67/bento', live: 'https://bento-rho-sable.vercel.app/lid.html'
  },
  {
    id: 2, name: 'Mustafa', country: 'SE', nps: 'passive',
    improve: 'Maybe add an guide to make html/css websites', well: 'The staff is friendly and helpful',
    heard: 'I dont fully remember, but i might have going thru the ysws channel?',
    channel: 'slack', cats: ['learn', 'community'],
    url: 'https://github.com/Zorp-MLG/Portfolio-Website/tree/main',
    live: 'https://zorp-mlg.github.io/Portfolio-Website/'
  },
  {
    id: 3, name: 'Ayah', country: 'CA', nps: 'passive',
    improve: 'More in-depth video tutorials and resources. a compiled library of useful resources would help new coders a lot!',
    well: 'Fair time-prizes earned ratio, excellent example websites, very encouraging tone, good breakdown of requirements on the Bento page',
    heard: 'Browsing the hack club programs page', channel: 'site',
    cats: ['learn', 'love', 'prizes'],
    live: 'https://sabertoothsandiego.github.io/Bento/'
  },
  {
    id: 4, name: 'Sejal', country: 'IN', nps: 'promoter',
    improve: 'Nothing major issue just keep it up in future I will turn 18 next year after another I might become a Alumna :)',
    well: 'its amazing I regret not knowing sooner everyone I met far now was a great host understanding problems',
    heard: "for first time I heard about hackclub through a friend's friend she told me bout sunbeam then I started researching myself finding it on app so from there I find bento because well I am bit foodie ( but strictly veg.)",
    channel: 'friend', cats: ['love', 'community'],
    url: 'https://github.com/sejalshukla2406-art/bento-studio',
    live: 'https://sejalshukla2406-art.github.io/bento-studio/'
  },
  {
    id: 5, name: 'Yousef', country: 'EG', nps: 'promoter',
    improve: 'increase prizes', well: 'Great Websites', heard: 'Hack Club Programs',
    channel: 'site', cats: ['prizes', 'love'],
    url: 'https://github.com/Youssif-Ezzeldin-225/Brialle',
    live: 'https://youssif-ezzeldin-225.github.io/Brialle/'
  },
  {
    id: 6, name: 'Ana Gabriela', country: 'MX', nps: 'passive',
    improve: 'the FAQ', well: 'prizes', heard: 'i searched it up', channel: 'search',
    cats: ['learn', 'prizes'],
    url: 'https://github.com/ALEXXXnh/BEEntO',
    live: 'https://alexxxnh.github.io/BEEntO/index.html'
  },
  {
    id: 7, name: 'Himanshu', country: 'NP', nps: 'promoter',
    improve: 'HEHE EVERYTHING SEEMS FINE', well: 'You are giving sushi', heard: '#bento in slack',
    channel: 'slack', cats: ['love', 'prizes'],
    url: 'https://github.com/himanshusapkota/DevDiary',
    live: 'https://himanshusapkota.github.io/DevDiary/'
  },
  {
    id: 8, name: 'Sadiya', country: 'US', nps: 'promoter',
    improve: "As of now I don't think they is anything to be improved I think it is going well so far.",
    well: 'You are doing well by making these types of ysws.',
    heard: 'I found out about this through the ysws channel on Slack.', channel: 'slack',
    cats: ['love'],
    url: 'https://github.com/sadiyameem/bento-recipes',
    live: 'https://sadiyameem.github.io/bento-recipes/'
  },
  {
    id: 9, name: 'Marcio', country: 'BR', nps: 'promoter',
    improve: "Improve what? It's more than good, it's perfect, don't worry.",
    well: "I really like programs like this, it's so much fun to make them, haha.",
    heard: 'I saw it in the program panel.', channel: 'site',
    cats: ['love'],
    url: 'https://github.com/Developer-Vini/TechBlog',
    live: 'https://blogvin.netlify.app'
  },
  {
    id: 10, name: 'Brandon', country: 'ZW', nps: 'promoter',
    improve: 'More prices', well: 'Almost everythin', heard: 'From a friend', channel: 'friend',
    cats: ['prizes', 'love'],
    url: 'https://github.com/0718083803/Personal-Site-/tree/main',
    live: 'https://0718083803.github.io/Personal-Site-/Welcome.html'
  },
  {
    id: 11, name: 'Freddie', country: 'GB', nps: 'passive',
    improve: 'not gettign hacked my jmw (if you are seeing this jmw, congrats - you about to get PAID, ima cry because... things will not be good for me) /silly',
    well: 'this form', heard: 'jacob', channel: 'jacob',
    cats: ['love'], url: 'https://meof.vercel.app'
  },
  {
    id: 12, name: 'Ana Gabriela', country: 'MX', nps: 'detractor',
    improve: 'not using AI to review, i got a feeling some of u guys using it and giving examples',
    well: 'slack community, the admins are cool and kind', heard: 'searched it up cuz i wanna start a club',
    channel: 'search', cats: ['process', 'community', 'learn'],
    url: 'https://github.com/ALEXXXnh/BENTO2',
    live: 'https://alexxxnh.github.io/BENTO2/'
  },
  {
    id: 13, name: 'Arpit', country: 'IN', nps: 'passive',
    improve: 'programs for more time', well: 'rewards for teen', heard: 'hackclub',
    channel: 'site', cats: ['time', 'prizes'],
    url: 'https://github.com/kaxokaze/before.you',
    live: 'https://before-you.onrender.com/'
  },
  {
    id: 14, name: 'Aman', country: 'IN', nps: 'passive',
    improve: "It would be nice to have clearer updates about submissions and approvals so people know what's happening after submitting their projects.",
    well: 'I like that Bento lets us build any kind of website and gives us a reason to try new things and ship projects.',
    heard: 'I found out about Bento through Hack Club.', channel: 'site',
    cats: ['process', 'love'],
    url: 'https://github.com/Duskled/Bento-Arcade',
    live: 'https://sweet-tree-6366.duskled.workers.dev/'
  },
  {
    id: 15, name: 'Catalin', country: 'MD', nps: 'promoter',
    improve: 'Idk, i love how yall are doing it now :))))))).',
    well: 'I mean the sushi plushie, and the yummy sushi i will pay with my own money, as i didnt have time to code more cuz of sleep.',
    heard: 'On https://hackclub.com/programs.', channel: 'site',
    cats: ['love', 'prizes'],
    url: 'https://github.com/nyvrixista/Pocket-Arcade',
    live: 'https://nyvrixista.github.io/Pocket-Arcade/'
  },
  {
    id: 16, name: '陽葵', country: 'JP', nps: 'passive',
    improve: 'It would help to show live Hackatime progress right on the submission form, so it is obvious how much tracked time is still needed before submitting.',
    well: 'The requirements are clear and the checklist makes it easy to know when a site is ready. Shipping real sushi for a three-page website is a great trade.',
    heard: 'Hack Club programs page', channel: 'site',
    cats: ['process', 'love'],
    url: 'https://github.com/maebahesioru/mikans-corner',
    live: 'https://maebahesioru.github.io/mikans-corner/'
  },
  {
    id: 17, name: 'Mustafa', country: 'SE', nps: 'passive',
    improve: 'maybe an guide to make html', well: 'nice staff',
    heard: 'From looking thru ysws on a slack channel, i dont remember which',
    channel: 'slack', cats: ['learn', 'community'],
    url: 'https://github.com/Zorp-MLG/Portfolio-Website',
    live: 'https://zorp-mlg.github.io/Portfolio-Website/'
  },
  {
    id: 18, name: 'Ankit', country: 'IN', nps: 'passive',
    improve: 'Better lapse intigration', well: 'Rules are just the theme, we get artistic liberty to make whatever we want',
    heard: 'I randomly found it on the hackclub programs tab', channel: 'site',
    cats: ['process', 'love'],
    url: 'https://github.com/Ankumeah/bento',
    live: 'https://ankumeah.github.io/bento/'
  },
  {
    id: 19, name: 'Sukhdev', country: 'IN', nps: 'promoter',
    improve: 'not sure abt it :(', well: 'i love how fast freddie replies to the queries',
    heard: 'I ACTUALLY FORGOT BUT I THINK THRU SLACK ITSELF',
    channel: 'slack', cats: ['love', 'community'],
    url: 'https://github.com/SukhdevThukral/Taberu',
    live: 'https://sukhdevthukral.github.io/Taberu/'
  },
  {
    id: 20, name: 'Jacob', country: 'GB', nps: 'promoter',
    improve: 'No ways to improve!', well: 'I think this is a great YSWS.',
    heard: 'Well. Surprise - I made this YSWS.',
    channel: 'made', cats: ['love'],
    url: 'https://github.com/smartsparkcoding/jacobxhc/',
    live: 'https://jacobxhc.navaratne.uk/'
  },
  {
    id: 21, name: 'Eloise', country: 'GB', nps: 'promoter',
    improve: 'Going to sleep on time (its 1:46am while submitting this)', well: 'Most things!',
    heard: 'Through Freddie Yershon', channel: 'friend', cats: ['love'],
    url: 'https://github.com/pinklady1209/bento/',
    live: 'https://pinklady1209.github.io/bento/'
  },
  {
    id: 22, name: 'Kafa', country: 'IN', nps: 'promoter',
    improve: 'Everything is working great so far',
    well: 'The platform is very fun and motivating for building projects',
    heard: 'Through Hack Club', channel: 'site', cats: ['love'],
    url: 'https://github.com/coaxbow99/bento',
    live: 'https://coaxbow99.github.io/bento/'
  },
  {
    id: 23, name: 'Arnav', country: 'IN', nps: 'promoter',
    improve: 'I think the website could have been a bit more interactive/animated.',
    well: 'Loved the idea of this and the reward. Different from the usual grants and all',
    heard: 'From ysws', channel: 'slack', cats: ['love', 'prizes'],
    url: 'https://github.com/Arnav-On-Top/RamenCraft/tree/main',
    live: 'https://arnav-on-top.github.io/RamenCraft/index.html'
  },
  {
    id: 24, name: 'Aadish', country: 'IN', nps: 'promoter',
    improve: 'Nothing is coming to mind as of now',
    well: 'Really nice website where everything is detailed on what to make',
    heard: 'Slack ysws channel', channel: 'slack', cats: ['love'],
    url: 'https://github.com/ggpogy123/bento-website-quiz',
    live: 'https://ggpogy123.github.io/bento-website-quiz/'
  },
  {
    id: 25, name: 'Zinedine', country: 'EG', nps: 'promoter',
    improve: 'all fine i think', well: 'this workshop',
    heard: 'I heard about it in the hackclub programs page', channel: 'site', cats: ['love'],
    url: 'https://github.com/Hushroot/linux-survival-guide',
    live: 'https://hushroot.github.io/linux-survival-guide/'
  },
  {
    id: 26, name: 'Nitika', country: 'IN', nps: 'promoter',
    improve: 'Umm....yeah...an example site....you could\'ve given us that for more ideas..!! Other than that...you are doing really good..!!',
    well: 'Your website is cute....and all the information and instructions are very clear....and yeah....people at slack from Bento are so helpful.',
    heard: 'I heard of Bento at Slack and the official Hackclub website.',
    channel: 'slack', cats: ['learn', 'love', 'community'],
    url: 'https://github.com/nikkume03/Little-Sunshine',
    live: 'https://nikkume03.github.io/Little-Sunshine/'
  },
  {
    id: 27, name: 'Sparsh', country: 'IN', nps: 'passive',
    improve: 'be more active on slack channel',
    well: 'giving free plushies and grant for free sushi(this is my first ysws)',
    heard: "from slack's YSWS channel", channel: 'slack', cats: ['community', 'prizes'],
    url: 'https://github.com/Sparsh230/Bento-food-blog',
    live: 'https://startling-strudel-8482f1.netlify.app'
  },
  {
    id: 28, name: 'Ann', country: 'US', nps: 'promoter',
    improve: 'From what I can tell, this program is doing great! If anything, perhaps add more levels/prizes (like maybe a plushie for Dango, another Japanese treat!)',
    well: "You guys are doing great with the incentive of coding for 3 hours to get a sushi plushie! Besides, who doesn't like building a website to get sushi?",
    heard: 'I heard about this as I was looking through the Programs available on the Hack Club website!',
    channel: 'site', cats: ['prizes', 'love'],
    url: 'https://github.com/anndenson/ann-bento',
    live: 'https://anndenson.github.io/ann-bento/'
  },
  {
    id: 29, name: 'Bani', country: 'CA', nps: 'promoter',
    improve: 'A biiiiit longer deadlines hahaha, I like going all out!! When I find that I lack the time to try to go beyond my limits, I end up opting out from doing something. I actually really wanted to utilize and experiment with JS for this project...but I know literally nothing about it LOL. I did try to study it a lot recently; but with how it wasn\'t really sticking with me mentally I ended up leaving it uhuuhuu...I believe if I had maybe a day or two more I would have tried it out. REGARDLESS It\'s not really a major issue!!!!1 I feel grateful that the deadline was this long already!!! Thank you HackClub!! ><',
    well: 'Incorporating rewards with learning code, in a way that can be accessible and fun to teens legit anywhere. As well as sponsoring school clubs that can create more accessibility. I also love how you guys have a Slack over a discord lolol, I actually discovered Slack through you guys, and it was like brain-altering HAHA. Super neat work!! I love how well organized events are, I previously did the boba workshop too, this is my second one, and both these events were really well coordinated!! Kudos. (:',
    heard: 'Through the Fleetwood Park Hack Club meeting :D',
    channel: 'friend', cats: ['time', 'love', 'community'],
    url: 'https://github.com/lambuny/website',
    live: 'https://lambuny.github.io/website'
  },
  {
    id: 30, name: 'Muhammad', country: 'EG', nps: 'promoter',
    improve: 'make v2', well: 'every thing', heard: 'Hack club Programs',
    channel: 'site', cats: ['love', 'again'],
    url: 'https://github.com/littleinventor7/bento',
    live: 'https://littleinventor7.github.io/bento/index.html'
  },
  {
    id: 31, name: 'Radhika', country: 'IN', nps: 'promoter',
    improve: 'a sample project maybe?',
    well: 'the org is pretty active in the #bento channel, so really works well with any queries or just a chat.',
    heard: '#ysws channel', channel: 'slack', cats: ['learn', 'community'],
    url: 'https://github.com/strawberryskeleton/omikuji-bento',
    live: 'https://strawberryskeleton.github.io/omikuji-bento/'
  },
  {
    id: 32, name: 'Abhishek', country: 'IN', nps: 'promoter',
    improve: 'maybeeeee host a v2 lol?',
    well: 'Everything ig but if I had to mention something, it would be the fast response to support tickets?',
    heard: 'From Slack!', channel: 'slack', cats: ['love', 'community', 'again'],
    url: 'https://github.com/Oreek/bento',
    live: 'https://bleh.fun/'
  },
  {
    id: 33, name: 'Ryan', country: 'CA', nps: 'passive',
    improve: 'ID verification was difficult but not really your fault.',
    well: 'Excellent UI and website design!',
    heard: 'I saw it while checking out the different workshops.', channel: 'site',
    cats: ['process', 'love'],
    url: 'https://github.com/mr-chen-rui/mr-chen-rui',
    live: 'https://mr-chen-rui.github.io/mr-chen-rui/'
  },
  {
    id: 34, name: 'NotSuspiciousProgrammer', country: 'US', nps: 'promoter',
    improve: 'Um... maybe include the question "would you like to have a plushie, or just all sushi?" in this form? Other than that, I am satisfied with Bento and don\'t have any suggestions. btw, I would like to have all sushi and not a plushie :D',
    well: 'The organizer is very nice and let me have an extension. I also like the theme of this YSWS!!',
    heard: 'I\'m part of Hack Club and found this directly through hackclub.com/programs :)',
    channel: 'site', cats: ['prizes', 'love'],
    url: 'https://github.com/kpoovakan/bento',
    live: 'https://kpoovakan.github.io/bento/'
  }
]

window.CHANNELS = [
  { id: 'site', label: 'Hack Club website', detail: 'programs / projects page / program panel', color: '#338eda' },
  { id: 'slack', label: 'Slack', detail: '#bento & the ysws channels', color: '#a633d6' },
  { id: 'friend', label: 'Word of mouth', detail: 'a friend, a club meeting, or Freddie himself', color: '#33d6a6' },
  { id: 'search', label: 'Search engine', detail: '“i searched it up”', color: '#f1c40f' },
  { id: 'jacob', label: 'Jacob, personally', detail: 'directly recruited', color: '#ec3750' },
  { id: 'made', label: 'On the Bento team', detail: '“Surprise - I made this YSWS.”', color: '#fb558e' }
]
