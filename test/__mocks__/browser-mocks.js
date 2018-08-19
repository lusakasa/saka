const chrome = require('sinon-chrome/extensions');
global.chrome = chrome;

jest.mock('msgx/client.js');
