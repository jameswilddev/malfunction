import type { GameArtifactLink } from "../game-artifact-link";

/**
 * A state of a compiled game.
 * @template TState The state used by the source game.
 * @template TLink  Describes a link from one state to another.
 */
export type GameArtifactState<TState, TLink> = {
  /**
   * The state as described by the source game.
   */
  readonly state: TState;

  /**
   * The links as described by the source game, and the states they linked to.
   */
  readonly links: ReadonlyArray<GameArtifactLink<TLink>>;
};
