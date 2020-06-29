const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const bodyParser = require('body-parser');

const FeedbackService = require('./services/FeedbackService');
const SpeakersServicce = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersServicce('./data/speakers.json');

const app = express();

const port = 3000;

const routes = require('./routes');
const { request, response } = require('express');

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['Gasdasddasd33', 'Fasadasdadw2'],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));

app.locals.siteName = 'ROUX Meetups';

app.use('/throw', (request, response, next) => {
  throw new Error('Something did Throw!');
});

app.use(async (request, response, next) => {
  try {
    const names = await speakersService.getNames();
    response.locals.speakerNames = names;

    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});
