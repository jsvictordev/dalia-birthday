export const initialTiles = [4, 0, 7, 2, 8, 1, 5, 3, 6];
export function swapTiles(tiles: readonly number[], first: number, second: number): number[] {
  const next = [...tiles];
  [next[first], next[second]] = [next[second], next[first]];
  return next;
}
export function isPuzzleSolved(tiles: readonly number[]): boolean {
  return tiles.length === 9 && tiles.every((tile, index) => tile === index);
}
