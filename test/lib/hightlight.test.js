import highlight from 'lib/highlight';

test('should return source text when matches is undefined', async () => {
  const text = 'http://www.example.com';
  const key = '';
  const matches = undefined;
  const result = highlight(text, key, matches);

  expect(result).toBe(text);
});

test('should return source text when matches is defined but empty', async () => {
  const text = 'http://www.example.com';
  const key = '';
  const matches = [];
  const result = highlight(text, key, matches);

  expect(result).toBe(text);
});

test('should return highlighted text when matches is defined and not empty', async () => {
  const text = 'http://www.example.com';
  const key = 'title';
  const matches = [
    {
      indices: [[13, 16]],
      value: 'example',
      key: 'title',
      arrayIndex: 0
    }
  ];

  const result = highlight(text, key, matches);

  expect(result).toEqual([
    'http://www.ex',
    {
      attributes: { style: { 'font-weight': 'bold' } },
      children: ['ampl'],
      key: undefined,
      nodeName: 'span'
    },
    'e.com'
  ]);
});
