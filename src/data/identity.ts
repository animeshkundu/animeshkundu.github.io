export const identity = {
  name: 'Animesh Kundu',
  givenName: 'Animesh',
  familyName: 'Kundu',
  url: 'https://animesh.kundus.in',
  email: 'anik.edu@gmail.com',
  location: 'Seattle',
  worksFor: 'Microsoft',
  image: 'https://github.com/animeshkundu.png',
  sameAs: [
    'https://github.com/animeshkundu',
    'https://www.linkedin.com/in/animeshkundu',
    'https://huggingface.co/animeshkundu',
    'https://addons.mozilla.org/en-US/firefox/user/12593965/',
    'https://www.facebook.com/animesh.kundu',
  ],
} as const;

export const publicGists = [
  {
    name: 'Parallel static file server',
    url: 'https://gist.github.com/animeshkundu',
    sourceName: 'static_file_server.py',
  },
  {
    name: 'HTTP API logger',
    url: 'https://gist.github.com/animeshkundu',
    sourceName: 'loggly.py',
  },
  {
    name: 'Public page scraper',
    url: 'https://gist.github.com/animeshkundu',
    sourceName: 'facebook_scrapper.py',
  },
  {
    name: 'EC2 address rotation utility',
    url: 'https://gist.github.com/animeshkundu',
    sourceName: 'rotate_ip_address',
  },
] as const;
