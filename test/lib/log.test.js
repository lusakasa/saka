import log from 'lib/log';

test('should not log when debug mode is disabled', async () => {
  global.SAKA_DEBUG = false;
  global.console = { log: jest.fn() };
  const result = log(1, 2, 3, 4);

  expect(result).toBe(1);
  expect(global.console.log.mock.calls.length).toBe(0);
});

test('should log when debug mode is enabled', async () => {
  global.SAKA_DEBUG = true;
  global.console = { log: jest.fn() };
  const result = log(1, 2, 3, 4);

  expect(result).toBe(1);
  expect(global.console.log.mock.calls.length).toBe(1);
});
