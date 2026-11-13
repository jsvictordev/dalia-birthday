import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = ts.transpileModule(readFileSync('src/utils/puzzle.ts', 'utf8'), {compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {initialTiles, swapTiles, isPuzzleSolved} = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
assert.deepEqual([...initialTiles].sort((a,b) => a-b), [0,1,2,3,4,5,6,7,8]);
assert.equal(isPuzzleSolved(initialTiles), false);
assert.equal(isPuzzleSolved([]), false);
const original = [...initialTiles];
let board = [...initialTiles];
for (let target = 0; target < 9; target++) {
  board = swapTiles(board, target, board.indexOf(target));
  assert.deepEqual([...board].sort((a,b) => a-b), [0,1,2,3,4,5,6,7,8]);
}
assert.equal(isPuzzleSolved(board), true);
assert.equal(isPuzzleSolved(swapTiles(board,0,8)), false);
assert.deepEqual(initialTiles, original);
assert.deepEqual(swapTiles(board,4,4), board);
console.log('Puzzle: nueve piezas únicas, tablero inicial mezclado, solución alcanzable e intercambios sin modificar el original verificados.');
