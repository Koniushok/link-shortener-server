import mongoose from 'mongoose';
import config from 'config';
import shortid from 'shortid';
import { LinkModel } from './models/link';

mongoose.connect(config.get('database'), {
  useCreateIndex: true,
  useNewUrlParser: true,
});
const links = [
  {
    title: 'Artyom',
    url: 'https://vk.com/tankill?z=photo182038085_456240962%2Falbum182038085_0%2Frev',
    description: 'photo Artyom',
    tags: ['vk', 'photo'],
  },
  {
    title: 'Music',
    url: 'https://zvooq.online/artists/twenty-one-pilots',
    description:
      'Music is an art form and cultural activity whose medium is sound organized in time. ',
    tags: ['music'],
  },
  {
    title: 'Bootstrap 3 Tutorial',
    url: 'https://www.w3schools.com/bootstrap/default.asp',
    description:
      'Bootstrap is the most popular HTML, CSS, and JavaScript framework for developing responsive, mobile-first websites.',
    tags: ['bootstrap', 'tutorial'],
  },
  {
    title: 'PHP 5 Tutorial',
    url: 'https://www.w3schools.com/php/default.asp',
    description:
      'PHP is a server scripting language, and a powerful tool for making dynamic and interactive Web pages.',
    tags: ['php', 'tutorial'],
  },
  {
    title: 'SQL Tutorial',
    url: 'https://www.w3schools.com/sql/default.asp',
    description:
      'SQL is a standard language for storing, manipulating and retrieving data in databases.',
    tags: ['SQL', 'tutorial'],
  },
  {
    title: 'JavaScript Tutorial',
    url: 'https://www.w3schools.com/js/default.asp',
    description: 'JavaScript is the programming language of HTML and the Web.',
    tags: ['js', 'tutorial'],
  },
  {
    title: 'CSS Tutorial',
    url: 'https://www.w3schools.com/css/default.asp',
    description: 'CSS is a language that describes the style of an HTML document.',
    tags: ['css', 'tutorial'],
  },
  {
    title: 'HTML5 Tutorial',
    url: 'https://www.w3schools.com/html/default.asp',
    description: 'With HTML you can create your own Website.',
    tags: ['html5', 'tutorial'],
  },
  {
    title: 'HTML Styles - CSS',
    url: 'https://www.w3schools.com/html/html_css.asp',
    description: 'CSS stands for Cascading Style Sheets.',
    tags: ['css', 'styles'],
  },
  {
    title: 'REST',
    url: 'https://ru.wikipedia.org/wiki/REST',
    description:
      'архитектурный стиль взаимодействия компонентов распределённого приложения в сети. ',
    tags: ['rest'],
  },
  {
    title: 'server',
    url: 'https://github.com/Koniushok/link-shortener-server',
    description: 'my server',
    tags: ['server', 'github'],
  },
  {
    title: 'new-es2018',
    url: 'https://css-tricks.com/new-es2018-features-every-javascript-developer-should-know/',
    description:
      'ES2018 further expands this syntax by adding spread properties to object literals.',
    tags: ['js'],
  },
  {
    title: '2018-staff',
    url: 'https://css-tricks.com/2018-staff-favorites/',
    description:
      'Last year, the team here at CSS-Tricks compiled a list of our favorite posts, trends, topics',
    tags: ['2018'],
  },
  {
    title: 'Список кодов состояния HTTP',
    url:
      'https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP',
    description: 'Список кодов состояния HTTP',
    tags: ['HTTP', 'wikipedia'],
  },
  {
    title: 'API',
    url: 'https://ru.wikipedia.org/wiki/API',
    description: 'API (программный интерфейс приложения, интерфейс прикладного программирования) ',
    tags: ['API', 'wikipedia'],
  },
  {
    title: 'JavaScript',
    url: 'https://ru.wikipedia.org/wiki/JavaScript',
    description:
      'мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией языка ECMAScript (стандарт ECMA-262[8]).',
    tags: ['js', 'wikipedia'],
  },
  {
    title: 'C++',
    url: 'https://ru.wikipedia.org/wiki/C%2B%2B',
    description:
      'компилируемый, статически типизированный язык программирования общего назначения.',
    tags: ['C++', 'wikipedia', 'C'],
  },
  {
    title: 'HTML',
    url: 'https://ru.wikipedia.org/wiki/HTML',
    description:
      'HTML (от англ. HyperText Markup Language — «язык гипертекстовой разметки») — стандартизированный язык разметки документов во Всемирной паутине',
    tags: ['HTML', 'wikipedia'],
  },
  {
    title: 'Ruby',
    url: 'https://ru.wikipedia.org/wiki/Ruby',
    description:
      'Ruby (англ. ruby — рубин, произносится [ru:bɪ] — ру́би) — динамический, рефлективный, интерпретируемый высокоуровневый язык ',
    tags: ['ruby', 'wikipedia'],
  },
  {
    title: 'ASP.NET',
    url: 'https://ru.wikipedia.org/wiki/ASP.NET',
    description: 'платформа разработки веб-приложений, в состав которой входит: веб-сервисы',
    tags: ['ASP.NET', 'wikipedia'],
  },
  {
    title: 'Google (компания)',
    url: 'https://ru.wikipedia.org/wiki/Google_(%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D1%8F)',
    description:
      'американская транснациональная публичная корпорация, реорганизованная 2 октября 2015 года в международный конгломерат Alphabet Inc., ',
    tags: ['google', 'wikipedia'],
  },
  {
    title: 'Go',
    url: 'https://ru.wikipedia.org/wiki/Go',
    description: 'компилируемый многопоточный язык программирования',
    tags: ['go', 'wikipedia'],
  },
  {
    title: 'Интернет',
    url: 'https://ru.wikipedia.org/wiki/%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82',
    description:
      ' всемирная система объединённых компьютерных сетей для хранения и передачи информации',
    tags: ['интернет', 'wikipedia'],
  },
  {
    title: 'React',
    url: 'https://ru.wikipedia.org/wiki/React',
    description: 'React разрабатывается и поддерживается Facebook',
    tags: ['react', 'wikipedia'],
  },
  {
    title: 'reactjs',
    url: 'https://reactjs.org/',
    description: 'reactjs',
    tags: ['js', 'reactjs'],
  },
  {
    title: 'React docs',
    url: 'https://reactjs.org/docs/getting-started.html',
    description: 'docs',
    tags: ['docs', 'React', 'js'],
  },
  {
    title: 'Tutorial React',
    url: 'https://reactjs.org/tutorial/tutorial.html',
    description: 'Tutorial React',
    tags: ['react', 'js', 'tutorial'],
  },
  {
    title: 'Community react',
    url: 'https://reactjs.org/community/support.html',
    description: 'React has a community of millions of developers.',
    tags: ['community', 'react'],
  },
  {
    title: 'React blog',
    url: 'https://reactjs.org/blog/2019/02/06/react-v16.8.0.html',
    description: 'React blog',
    tags: ['2019', 'blog', 'react', 'js'],
  },
  {
    title: 'React fragments',
    url: 'https://reactjs.org/docs/fragments.html',
    description: 'A common pattern in React is for a component to return multiple elements. ',
    tags: ['react', 'js'],
  },
  {
    title: 'Portals react',
    url: 'https://reactjs.org/docs/portals.html',
    description:
      'Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.',
    tags: ['react', 'portals'],
  },
  {
    title: 'React accessibility',
    url: 'https://reactjs.org/docs/accessibility.html',
    description:
      'React fully supports building accessible websites, often by using standard HTML techniques.',
    tags: [],
  },
  {
    title: 'React context',
    url: 'https://reactjs.org/docs/context.html',
    description:
      'Context provides a way to pass data through the component tree without having to pass props down manually at every level.',
    tags: ['react', 'js'],
  },
  {
    title: 'React error',
    url: 'https://reactjs.org/docs/error-boundaries.html',
    description: 'React erro',
    tags: ['react', 'error'],
  },
  {
    title: 'React depth',
    url: 'https://reactjs.org/docs/jsx-in-depth.html',
    description: 'Fundamentally, JSX just provides syntactic sugar',
    tags: ['depth', 'react', 'js'],
  },
  {
    title: 'Render Props',
    url: 'https://reactjs.org/docs/render-props.html',
    description:
      'A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.',
    tags: ['react', 'props'],
  },
  {
    title: 'Static-type-checking',
    url: 'https://reactjs.org/docs/static-type-checking.html',
    description: 'Static-type-checking',
    tags: ['react', 'js'],
  },
  {
    title: 'Flow Blog',
    url: 'https://flow.org/blog/',
    description: 'Flow Blog',
    tags: ['flow', 'flowtype', 'js'],
  },
  {
    title: 'Flow',
    url: 'https://flow.org/blog/',
    description: 'Flow',
    tags: ['flow', 'flowtype', 'js'],
  },
  {
    title: 'Flow Type Variance',
    url: 'https://flow.org/en/docs/lang/variance/',
    description: 'Type Variance',
    tags: ['flow', 'flowtype', 'js'],
  },
  {
    title: 'Flow Depth Subtyping',
    url: 'https://flow.org/en/docs/lang/depth-subtyping/',
    description: 'Flow',
    tags: ['flow', 'flowtype', 'js'],
  },
  {
    title: 'Flow Type System',
    url: 'https://flow.org/en/docs/lang/',
    description: 'Flow Type System',
    tags: ['flow', 'flowtype', 'js'],
  },
  {
    title: 'Flow Type Annotations',
    url: 'https://flow.org/en/docs/types/',
    description: 'Flow Type Annotations',
    tags: ['flow', 'flowtype', 'js'],
  },
  {
    title: 'Flow install',
    url: 'https://flow.org/en/docs/install/',
    description:
      'First you’ll need to setup a compiler to strip away Flow types. You can choose between Babel and flow-remove-types.',
    tags: ['flow', 'flowtype', 'js'],
  },
  {
    title: 'flow getting-started',
    url: 'https://flow.org/en/docs/getting-started/',
    description: 'flow getting-started',
    tags: ['flow', 'flowtype', 'js'],
  },
  {
    title: 'Flow',
    url: 'https://flow.org/',
    description:
      'Its hard to build smart tools for dynamic languages like JavaScript. Flow understands your code and makes its knowledge available, enabling other smart tools to be built on top of Flow.',
    tags: ['flow', 'flowtype', 'js'],
  },
  {
    title: 'Redux Actions',
    url: 'https://redux.js.org/basics/actions',
    description: 'Actions',
    tags: ['Redux', 'js'],
  },
  {
    title: 'Redux Examples',
    url: 'https://redux.js.org/introduction/examples',
    description: 'Examples',
    tags: ['Redux', 'js'],
  },
  {
    title: 'Redux Learning Resources',
    url: 'https://redux.js.org/introduction/learning-resources',
    description: 'Tutorials that teach the basic concepts of Redux and how to use it',
    tags: ['Redux', 'js'],
  },
  {
    title: 'Redux Prior Art',
    url: 'https://redux.js.org/introduction/prior-art',
    description:
      'Redux has a mixed heritage. It is similar to some patterns and technologies, but is also different from them in important ways. Well explore some of the similarities and the differences below.',
    tags: ['Redux', 'js'],
  },
  {
    title: 'Redux Installation',
    url: 'https://redux.js.org/introduction/installation',
    description: 'Redux',
    tags: ['Redux', 'js'],
  },
  {
    title: 'Redux API Reference',
    url: 'https://redux.js.org/api/api-reference',
    description: 'Redux',
    tags: ['Redux', 'js'],
  },
  {
    title: 'Redux Starter Kit',
    url: 'https://redux.js.org/introduction/getting-started#redux-starter-kit',
    description: 'Redux Starter Kit',
    tags: ['Redux', 'js'],
  },
  {
    title: 'Redux getting-started',
    url: 'https://redux.js.org/introduction/getting-started',
    description: 'getting-started',
    tags: ['Redux', 'js'],
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    description: 'Redux',
    tags: ['Redux', 'js'],
  },
  {
    title: 'Redux',
    url: 'https://redux-saga.js.org/',
    description: 'redux',
    tags: ['redux-saga', 'redux'],
  },
];

async function createLinks() {
  const user = new mongoose.Types.ObjectId();
  const data = links.map(linkData => ({ ...linkData, user, shortLink: shortid.generate() }));
  await LinkModel.insertMany(data);
  mongoose.disconnect();
}
createLinks();
