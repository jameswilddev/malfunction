/**
 * A link within a compiled game.
 * @template TLink Describes a link from one state to another.
 */
export type GameArtifactLink<TLink> = {
  /**
   * The link, as provided by the game source.
   */
  readonly link: TLink;

  /**
   * The index of the game artifact state linked to.
   */
  readonly stateIndex: number;
};
