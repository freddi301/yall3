export function updateInArray<T>(array: Array<T>, index: number, item: T) {
  return [...array.slice(0, index), item, ...array.slice(index + 1)];
}
