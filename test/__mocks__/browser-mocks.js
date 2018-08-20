// const chrome = require('sinon-chrome/extensions');
// const browser = require('sinon-chrome/webextensions');
// global.chrome = chrome;
// global.browser = browser;

jest.mock('msgx/client.js', () =>
  jest.fn().mockImplementation(() => {
    return jest.fn().mockImplementation(mode => {
      let api = {
        zoom: Promise.resolve(1),
        sg: []
      };

      return api[mode];
    });
  })
);

// ({ default: jest.fn() })
