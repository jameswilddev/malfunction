import type { GameArtifactState } from "../..";
import type { GameArtifact } from "../../types/game-artifact";
import type { GameArtifactLink } from "../../types/game-artifact-link";
import type { GameSource } from "../../types/game-source";

/**
 * Compiles a game.
 * @template TState  Represents a state a game can be in.
 * @template TLink   Describes a link from one state to another.
 * @param gameSource The source of the game to compile.
 * @returns          The compiled game.
 */
export const malfunction = async <TState, TLink>(
  gameSource: GameSource<TState, TLink>
): Promise<GameArtifact<TState, TLink>> => {
  const initialStateObject: {
    readonly state: TState;
    links: {
      readonly link: TLink;
      stateIndex: number;
    }[];
  } = {
    state: gameSource.initialState,
    links: [],
  };

  const states: {
    readonly state: TState;
    links: {
      readonly link: TLink;
      stateIndex: number;
    }[];
  }[] & {
    readonly 0: GameArtifactState<TState, TLink>;
  } = [initialStateObject];

  const crawlLinks = async (stateObject: {
    readonly state: TState;
    links: GameArtifactLink<TLink>[];
  }): Promise<void> => {
    for (const link of await gameSource.linksFromState(stateObject.state)) {
      stateObject.links.push({
        link: link[0],
        stateIndex: await crawl(link[1]),
      });
    }
  };

  const crawl = async (state: TState): Promise<number> => {
    for (let i = 0; i < states.length; i++) {
      if (
        await gameSource.statesAreEquivalent(
          state,
          (states[i] as GameArtifactState<TState, TLink>).state
        )
      ) {
        return i;
      }
    }

    const stateObject: {
      readonly state: TState;
      links: GameArtifactLink<TLink>[];
    } = {
      state,
      links: [],
    };

    const index = states.length;
    states.push(stateObject);

    await crawlLinks(stateObject);

    return index;
  };

  await crawlLinks(initialStateObject);

  await crawl(gameSource.initialState);

  let changeMade: boolean;

  do {
    changeMade = false;

    for (let i = 0; i < states.length; i++) {
      const firstState = states[i] as GameArtifactState<TState, TLink>;

      for (let j = i + 1; j < states.length; ) {
        const secondState = states[j] as GameArtifactState<TState, TLink>;

        let thisIsMergeable =
          (await gameSource.statesAppearEquivalentToPlayers(
            firstState.state,
            secondState.state
          )) && firstState.links.length === secondState.links.length;

        if (thisIsMergeable) {
          for (const firstStateLink of firstState.links) {
            let linkFound = false;

            for (const secondStateLink of secondState.links) {
              if (
                (await gameSource.linksAppearEquivalentToPlayers(
                  firstStateLink.link,
                  secondStateLink.link
                )) &&
                firstStateLink.stateIndex === secondStateLink.stateIndex
              ) {
                linkFound = true;
                break;
              }
            }

            if (!linkFound) {
              thisIsMergeable = false;
              break;
            }
          }
        }

        if (thisIsMergeable) {
          states.splice(j, 1);

          for (const modifiedState of states) {
            for (const link of modifiedState.links) {
              if (link.stateIndex === j) {
                link.stateIndex = i;
              } else if (link.stateIndex > j) {
                link.stateIndex--;
              }
            }
          }

          changeMade = true;
        } else {
          j++;
        }
      }
    }
  } while (changeMade);

  return { states };
};
