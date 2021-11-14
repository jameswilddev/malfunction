/**
 * An uncompiled game.
 * @template TState Describes a state the game can be in.
 * @template TLink  Describes a link from one state to another.
 */
export type GameSource<TState, TLink> = {
  /**
   * The state in which the game states.
   */
  readonly initialState: TState;

  /**
   * Determines whether two instances of game state are functionally identical.
   * @param a The first state to compare.
   * @param b The second state to compare.
   * @returns True when the given instances of game state are functionally
   *          identical, otherwise, false.
   */
  statesAreEquivalent(a: TState, b: TState): Promise<boolean>;

  /**
   * Determines whether two instances of game state appear to be identical to
   * the player(s).
   * @param a The first state to compare.
   * @param b The second state to compare.
   * @returns True when the given instances of game state appear to be identical
   *          to the player(s), otherwise, false.
   */
  statesAppearEquivalentToPlayers(a: TState, b: TState): Promise<boolean>;

  /**
   * Determines whether two links appear to be identical to the player(s).
   * @param a The first link to compare.
   * @param b The second link to compare.
   * @returns True when the given links appear to be identical to the player(s),
   *          otherwise, false.
   */
  linksAppearEquivalentToPlayers(a: TLink, b: TLink): Promise<boolean>;

  /**
   * Determines which states can be reached from a given game state, and how.
   * Must be deterministic.
   * @param state The game state to evaluate.
   * @returns     The links from the given state, and the states they map to.
   */
  linksFromState(
    state: TState
  ): Promise<ReadonlyArray<readonly [TLink, TState]>>;
};
