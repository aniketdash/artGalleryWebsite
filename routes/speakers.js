const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const speakers = await speakersService.getList();
      const artwork = await speakersService.getAllArtwork();
      const topSpeakers = await speakersService.getList();
      return response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        artwork,
        topSpeakers,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortname', async (request, response, next) => {
    try {
      const artwork = await speakersService.getArtworkForSpeaker(request.params.shortname);
      const speaker = await speakersService.getSpeaker(request.params.shortname);
      return response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers-detail',
        speaker,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
