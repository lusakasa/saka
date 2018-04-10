// const browser = require('sinon-chrome/webextensions');
// import client from 'suggestion_engine/client';

// describe('suggestion_engine/client ', function() {
//   beforeAll(function() {
//     global.browser = browser;
//   });

//   beforeEach(function() {
//     browser.flush();
//   });

//   describe('getSuggestions ', function() {
//     it('should return all tabs when no search string provided', async function() {
//       const queryResults = [
//         {
//           id: 1,
//           windowId: 0,
//           title: 'Google',
//           url: 'https://google.com',
//           favIconUrl: 'https://google.com/icon.png'
//         },
//         {
//           id: 0,
//           windowId: 0,
//           title: 'Saka',
//           url: 'https://github.com/lusakasa/saka',
//           favIconUrl: 'https://github.com/lusakasa/saka/icon.png'
//         }
//       ];

//       const tabHistory = {
//         tabHistory: [
//           {
//             type: 'tab',
//             tabId: 1,
//             windowId: 0,
//             title: 'Google',
//             url: 'https://google.com',
//             favIconUrl: 'https://google.com/icon.png'
//           }
//         ]
//       };

//       const expectedResult = [
//         undefined,
//         {
//           type: 'tab',
//           tabId: 0,
//           windowId: 0,
//           title: 'Saka',
//           url: 'https://github.com/lusakasa/saka',
//           favIconUrl: 'https://github.com/lusakasa/saka/icon.png'
//         },
//         {
//           type: 'tab',
//           tabId: 1,
//           windowId: 0,
//           title: 'Google',
//           url: 'https://google.com',
//           favIconUrl: 'https://google.com/icon.png'
//         }
//       ];

//       const searchString = '';
//       browser.tabs.query.returns(queryResults);
//       browser.runtime.getBackgroundPage.returns(tabHistory);
//       expect(await tabSuggestions(searchString)).toEqual(expectedResult);
//     });
//   });

//   afterAll(function() {
//     browser.flush();
//     delete global.browser;
//   });
// });
