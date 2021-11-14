import type { GameArtifactState } from "../game-artifact-state";

/**
 * The result of compiling a game.
 * @template TState Represents a state the game can be in.
 * @template TLink  Describes a link from one state to another.
 */
export type GameArtifact<TState, TLink> = {
  /**
   * The states found by compiling the game.
   * The first is the initial state; this is never empty.
   */
  readonly states: ReadonlyArray<GameArtifactState<TState, TLink>> & {
    readonly 0: GameArtifactState<TState, TLink>;
  };
};
