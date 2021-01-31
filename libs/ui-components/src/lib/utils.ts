export const coerceArray = <T = any>(arrayOrSingle: T | T[]): T[] =>
  Array.isArray(arrayOrSingle) ? arrayOrSingle : [arrayOrSingle];
