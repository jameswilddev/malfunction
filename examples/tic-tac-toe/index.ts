import type { GameSource } from "../..";

const initialState: State = {
  next: `player1`,
  grid: [
    [`unclaimed`, `unclaimed`, `unclaimed`],
    [`unclaimed`, `unclaimed`, `unclaimed`],
    [`unclaimed`, `unclaimed`, `unclaimed`],
  ],
};

export const gameSource: GameSource<State, Link> = {
  initialState,

  async statesAreEquivalent(a: State, b: State): Promise<boolean> {
    for (const row of rowAndColumnIndices) {
      for (const column of rowAndColumnIndices) {
        if (a.grid[row][column] !== b.grid[row][column]) {
          return false;
        }
      }
    }

    return true;
  },

  async statesAppearEquivalentToPlayers(a: State, b: State): Promise<boolean> {
    for (const row of rowAndColumnIndices) {
      for (const column of rowAndColumnIndices) {
        if (a.grid[row][column] !== b.grid[row][column]) {
          return false;
        }
      }
    }

    return true;
  },

  async linksAppearEquivalentToPlayers(a: Link, b: Link): Promise<boolean> {
    if (a.type === `claim` && b.type === `claim`) {
      return a.row === b.row && a.column == b.column;
    } else {
      return a.type === b.type;
    }
  },

  async linksFromState(
    state: State
  ): Promise<ReadonlyArray<readonly [Link, State]>> {
    const links: (readonly [Link, State])[] = [
      [{ type: `reset` }, initialState],
    ];

    for (const playerTile of playerTiles) {
      for (const winPattern of winPatterns) {
        let won = true;

        for (const coordinate of winPattern) {
          if (state.grid[coordinate[0]][coordinate[1]] !== playerTile) {
            won = false;
            break;
          }
        }

        if (won) {
          return links;
        }
      }
    }

    for (const row of rowAndColumnIndices) {
      for (const column of rowAndColumnIndices) {
        if (state.grid[row][column] === `unclaimed`) {
          const grid: [
            [Tile, Tile, Tile],
            [Tile, Tile, Tile],
            [Tile, Tile, Tile]
          ] = [
            [state.grid[0][0], state.grid[0][1], state.grid[0][2]],
            [state.grid[1][0], state.grid[1][1], state.grid[1][2]],
            [state.grid[2][0], state.grid[2][1], state.grid[2][2]],
          ];

          grid[row][column] = state.next;

          links.push([
            {
              type: `claim`,
              row,
              column,
            },
            {
              next: state.next === `player1` ? `player2` : `player1`,
              grid,
            },
          ]);
        }
      }
    }

    return links;
  },
};

export type PlayerTile = `player1` | `player2`;
export type Tile = `unclaimed` | PlayerTile;
export type RowOrColumnIndex = 0 | 1 | 2;

export type GridRow = readonly [Tile, Tile, Tile];

export type State = {
  readonly next: PlayerTile;
  readonly grid: readonly [GridRow, GridRow, GridRow];
};

export type Link =
  | {
      readonly type: `reset`;
    }
  | {
      readonly type: `claim`;
      readonly row: RowOrColumnIndex;
      readonly column: RowOrColumnIndex;
    };

const rowAndColumnIndices: ReadonlyArray<RowOrColumnIndex> = [0, 1, 2];
const playerTiles: ReadonlyArray<Tile> = [`player1`, `player2`];

const winPatterns: ReadonlyArray<
  readonly [
    readonly [RowOrColumnIndex, RowOrColumnIndex],
    readonly [RowOrColumnIndex, RowOrColumnIndex],
    readonly [RowOrColumnIndex, RowOrColumnIndex]
  ]
> = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];
