import { h } from 'preact';

function highlighted(text, indices) {
  const out = [];
  let unit = '';
  const pairIndex = 0;
  let pair = indices[pairIndex + 1];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (pair && i === pair[0]) {
      out.push(unit);
      unit = '';
    }
    unit += char;
    if (pair && i === pair[1]) {
      out.push(<span style={{ 'font-weight': 'bold' }}>{unit}</span>);
      unit = '';
      pair = indices[pairIndex + 1];
    }
  }
  if (unit !== '') out.push(unit);
  return out;
}

export default function highlight(text, key, matches) {
  const matchesForKey = matches && matches.find(match => match.key === key);
  return matchesForKey ? highlighted(text, matchesForKey.indices) : text;
}
