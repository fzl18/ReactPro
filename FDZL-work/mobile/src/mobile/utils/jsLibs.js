// Split array into chunks of N length
// array => array to split
// size => split every n size
export const partitionArray = (array, size) =>
array.map((e, i) => ((i % size === 0) ? array.slice(i, i + size) : null)).filter(e => e);
