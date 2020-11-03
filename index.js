const md = require('markdown-it')({
  html: true,
  linkify: true,
  breaks: true,
});
const mdEmoji = require('markdown-it-emoji');
const fs = require('fs');
const axios = require('axios').default;

md.use(mdEmoji);

const BLOG_HOST = `https://girlsincode.com/`;

const introTitle = generateTitle(
  2,
  `Hola <img src="https://user-images.githubusercontent.com/1303154/88677602-1635ba80-d120-11ea-84d8-d263ba5fc3c0.gif" width="28px" alt="hi">`
);
const introDescription = `I'm Violeta, a freelance software engineer from Romania <img src="romania.svg" width="13"/> and based in Barcelona <img src="spain.svg" width="13"/>`;

const badgeConfigs = [
  {
    name: 'Website',
    badgeText: 'girlsincode',
    labelBgColor: '004880',
    logoBgColor: '004880',
    logo: '',
    link: 'https://girlsincode.com',
  },
  {
    name: 'linkedin',
    badgeText: 'avioleta',
    labelBgColor: '0e76a8',
    logoBgColor: '0e76a8',
    logo: 'linkedin',
    link: 'https://www.linkedin.com/in/avioleta/',
  },
  {
    name: 'LinkedIn',
    badgeText: 'girls_incode',
    labelBgColor: '1ca0f1',
    logoBgColor: '1ca0f1',
    logo: 'twitter',
    link: 'https://twitter.com/girls_incode',
  },
  {
    name: 'Mail',
    badgeText: 'girls.in.codes',
    labelBgColor: '0A0A0A',
    logoBgColor: '0A0A0A',
    logo: 'gmail',
    link: 'mailto:girls.in.codes@gmail.com',
  },
  {
    name: 'youtube',
    badgeText: 'girls_incode',
    labelBgColor: 'e74c3c',
    logoBgColor: 'e74c3c',
    logo: 'youtube',
    link: 'https://youtube.com/girls_incode',
  },
  {
    name: 'instagram',
    badgeText: 'violeta.girlsincode',
    labelBgColor: 'E4405F',
    logoBgColor: 'E4405F',
    logo: 'instagram',
    link: 'https://www.instagram.com/violeta.girlsincode',
  },
];
const badges = badgeConfigs.reduce((result, config) => result + ' ' + generateBadge(config), '');

const postsTitle = generateTitle(2, `Recent articles`);
const toolsTitle = generateTitle(2, `My prefered tools`);
const toolsIconSize = 25;
const toolsConfig = [
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
    alt: 'react',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg',
    alt: 'angular-js',
  },
  {
    src:
      'https://devicons.github.io/devicon/devicon.git/icons/vuejs/vuejs-original-wordmark.svg',
    alt: 'vue',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain.svg',
    alt: 'bootstrap',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
    alt: 'css3',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/gulp/gulp-plain.svg',
    alt: 'gulp',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original-wordmark.svg',
    alt: 'java',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    alt: 'javascript',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    alt: 'typescript',
  },
  {
    src:
      'https://devicons.github.io/devicon/devicon.git/icons/dot-net/dot-net-original-wordmark.svg',
    alt: '.NET',
  },
  {
    src:
      'https://devicons.github.io/devicon/devicon.git/icons/mongodb/mongodb-original-wordmark.svg',
    alt: 'mongodb',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
    alt: 'mysql',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg',
    alt: 'redis',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
    alt: 'nodejs',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original-wordmark.svg',
    alt: 'python',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg',
    alt: 'nginx',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/cucumber/cucumber-plain.svg',
    alt: 'cucumber',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/heroku/heroku-plain.svg',
    alt: 'heroku',
  },
  {
    src:
      'https://raw.githubusercontent.com/devicons/devicon/master/icons/travis/travis-plain.svg',
    alt: 'travis',
  },
  {
    src:
      'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/aws/aws.png',
    alt: 'aws',
  },
  {
    src: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg',
    alt: 'gcp',
  },
  {
    src:
      'https://devicons.github.io/devicon/devicon.git/icons/docker/docker-original-wordmark.svg',
    alt: 'Docker',
  },
  {
    src: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg',
    alt: 'Kubernetes',
  },
];
const tools = toolsConfig.reduce(
  (result, toolConfig) =>
    result + '\n' + generateIcon(toolConfig, toolsIconSize),
  ''
);

const visitors = `![visitors](https://visitor-badge.glitch.me/badge?page_id=.girls-incode.girls-incode)`;

(async () => {
  const response = await axios.get(
    `${BLOG_HOST}/blog.json`
  );
  let posts = ``;

  response.map((post) => {
    const { title, published, url } = post;
    posts += `<li><a target="_blank" href="${url}">${title} — ${published}</a></li>`;
  });

const content = `${introTitle}\n
${introDescription}\n
${badges}\n
${postsTitle}\n
${posts}\n
<a target="_blank" href="${BLOG_HOST}">Read More</a>\n
${toolsTitle}\n
<p align="left">\n
${tools}\n
</p>\n
${visitors}
`;

  const markdownContent = md.render(content);

  fs.writeFile('README.md', markdownContent, (err) => {
    if (err) {
      return console.error(err);
    }
    console.info(`Generated README.md...`);
  });
})();

function generateBadge(badgeConfig) {
  return `[![${badgeConfig.name} Badge](https://img.shields.io/badge/-${badgeConfig.badgeText}-${badgeConfig.labelBgColor}?style=flat&labelColor=${badgeConfig.logoBgColor}&logo=${badgeConfig.logo}&link=${badgeConfig.link})](${badgeConfig.link})`;
}

function generateIcon(iconConfig, toolsIconSize) {
  return `<img src="${iconConfig.src}" alt="${iconConfig.alt}" width="${toolsIconSize}" height="${toolsIconSize}" />`;
}

function generateTitle(size, title) {
  return `${'#'.repeat(size)} ${title}`;
}

function generateLink(label, link) {
  return `[${label}](${link})`;
}
