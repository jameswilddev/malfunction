import type { GameSource } from "../..";

export type State = -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;
export type Link = `reset` | `pullLeft` | `pullRight`;

export const gameSource: GameSource<State, Link> = {
  initialState: 0,

  async statesAreEquivalent(a: State, b: State): Promise<boolean> {
    return a === b;
  },

  async statesAppearEquivalentToPlayers(a: State, b: State): Promise<boolean> {
    return a === b;
  },

  async linksAppearEquivalentToPlayers(a: Link, b: Link): Promise<boolean> {
    return a === b;
  },

  async linksFromState(
    state: State
  ): Promise<ReadonlyArray<readonly [Link, State]>> {
    const links: (readonly [Link, State])[] = [[`reset`, 0]];

    if (state > -5 && state < 5) {
      links.push(
        [`pullLeft`, (state - 1) as State],
        [`pullRight`, (state + 1) as State]
      );
    }

    return links;
  },
};
