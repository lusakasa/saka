export default (thing, ...things) => {
  if (SAKA_DEBUG) {
    console.log(thing, ...things);
  }
  return thing;
};
