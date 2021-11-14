import {
  GameArtifact,
  GameArtifactState,
  GameSource,
  malfunction,
} from "../..";
import {
  gameSource as tugOfWarGameSource,
  Link as TugOfWarLink,
  State as TugOfWarState,
} from "../../examples/tug-of-war";
import {
  gameSource as ticTacToeGameSource,
  Link as TicTacToeLink,
  PlayerTile,
  RowOrColumnIndex,
  State as TicTacToeState,
  Tile,
} from "../../examples/tic-tac-toe";

describe(`functions`, () => {
  describe(`malfunction`, () => {
    describe(`when compiling a test game`, () => {
      type State =
        | `initial`
        | `firstRememberedChoice`
        | `firstForgottenChoiceA`
        | `firstForgottenChoiceB`
        | `secondRememberedChoiceAA`
        | `secondRememberedChoiceAB`
        | `secondRememberedChoiceBA`
        | `secondRememberedChoiceBB`
        | `secondForgottenChoiceAAA`
        | `secondForgottenChoiceAAB`
        | `secondForgottenChoiceABA`
        | `secondForgottenChoiceABB`
        | `secondForgottenChoiceBAA`
        | `secondForgottenChoiceBAB`
        | `secondForgottenChoiceBBA`
        | `secondForgottenChoiceBBB`
        | `outcomeAAAA`
        | `outcomeAAAB`
        | `outcomeAABA`
        | `outcomeAABB`
        | `outcomeABAA`
        | `outcomeABAB`
        | `outcomeABBA`
        | `outcomeABBB`
        | `outcomeBAAA`
        | `outcomeBAAB`
        | `outcomeBABA`
        | `outcomeBABB`
        | `outcomeBBAA`
        | `outcomeBBAB`
        | `outcomeBBBA`
        | `outcomeBBBB`;

      type Link =
        | `initial`
        | `firstForgottenChoiceA`
        | `firstForgottenChoiceB`
        | `firstRememberedChoiceAA`
        | `firstRememberedChoiceAB`
        | `firstRememberedChoiceBA`
        | `firstRememberedChoiceBB`
        | `secondForgottenChoiceAAA`
        | `secondForgottenChoiceAAB`
        | `secondForgottenChoiceABA`
        | `secondForgottenChoiceABB`
        | `secondForgottenChoiceBAA`
        | `secondForgottenChoiceBAB`
        | `secondForgottenChoiceBBA`
        | `secondForgottenChoiceBBB`
        | `secondRememberedChoiceAAAA`
        | `secondRememberedChoiceAAAB`
        | `secondRememberedChoiceAABA`
        | `secondRememberedChoiceAABB`
        | `secondRememberedChoiceABAA`
        | `secondRememberedChoiceABAB`
        | `secondRememberedChoiceABBA`
        | `secondRememberedChoiceABBB`
        | `secondRememberedChoiceBAAA`
        | `secondRememberedChoiceBAAB`
        | `secondRememberedChoiceBABA`
        | `secondRememberedChoiceBABB`
        | `secondRememberedChoiceBBAA`
        | `secondRememberedChoiceBBAB`
        | `secondRememberedChoiceBBBA`
        | `secondRememberedChoiceBBBB`
        | `outcomeAAAA`
        | `outcomeAAAB`
        | `outcomeAABA`
        | `outcomeAABB`
        | `outcomeABAA`
        | `outcomeABAB`
        | `outcomeABBA`
        | `outcomeABBB`
        | `outcomeBAAA`
        | `outcomeBAAB`
        | `outcomeBABA`
        | `outcomeBABB`
        | `outcomeBBAA`
        | `outcomeBBAB`
        | `outcomeBBBA`
        | `outcomeBBBB`;

      let gameArtifact: GameArtifact<State, Link>;

      beforeAll(async () => {
        const equivalent = <T>(
          a: T,
          b: T,
          combinations: ReadonlyArray<ReadonlyArray<T>>
        ) =>
          combinations.some(
            (combination) => combination.includes(a) && combination.includes(b)
          );

        const gameSource: GameSource<State, Link> = {
          initialState: `initial`,
          async statesAreEquivalent(a, b) {
            return a === b;
          },
          async statesAppearEquivalentToPlayers(a, b) {
            return equivalent(a, b, [
              [`firstForgottenChoiceA`],
              [`firstForgottenChoiceB`],
              [`secondRememberedChoiceAA`, `secondRememberedChoiceAB`],
              [`secondRememberedChoiceBA`, `secondRememberedChoiceBB`],
              [`secondForgottenChoiceAAA`, `secondForgottenChoiceABA`],
              [`secondForgottenChoiceAAB`, `secondForgottenChoiceABB`],
              [`secondForgottenChoiceBAA`, `secondForgottenChoiceBBA`],
              [`secondForgottenChoiceBAB`, `secondForgottenChoiceBBB`],
              [`outcomeAAAA`, `outcomeABAA`, `outcomeAAAB`, `outcomeABAB`],
              [`outcomeBAAA`, `outcomeBBAA`, `outcomeBAAB`, `outcomeBBAB`],
              [`outcomeAABA`, `outcomeABBA`, `outcomeAABB`, `outcomeABBB`],
              [`outcomeBABA`, `outcomeBBBA`, `outcomeBABB`, `outcomeBBBB`],
            ]);
          },
          async linksAppearEquivalentToPlayers(a, b) {
            return equivalent(a, b, [
              [`firstRememberedChoiceAA`, `firstRememberedChoiceBA`],
              [`firstRememberedChoiceAB`, `firstRememberedChoiceBB`],
              [
                `secondForgottenChoiceAAA`,
                `secondForgottenChoiceBAA`,
                `secondForgottenChoiceABA`,
                `secondForgottenChoiceBBA`,
              ],
              [
                `secondForgottenChoiceAAB`,
                `secondForgottenChoiceBAB`,
                `secondForgottenChoiceABB`,
                `secondForgottenChoiceBBB`,
              ],
              [
                `secondRememberedChoiceAAAA`,
                `secondRememberedChoiceAABA`,
                `secondRememberedChoiceABAA`,
                `secondRememberedChoiceABBA`,
                `secondRememberedChoiceBAAA`,
                `secondRememberedChoiceBABA`,
                `secondRememberedChoiceBBAA`,
                `secondRememberedChoiceBBBA`,
              ],
              [
                `secondRememberedChoiceAAAB`,
                `secondRememberedChoiceAABB`,
                `secondRememberedChoiceABAB`,
                `secondRememberedChoiceABBB`,
                `secondRememberedChoiceBAAB`,
                `secondRememberedChoiceBABB`,
                `secondRememberedChoiceBBAB`,
                `secondRememberedChoiceBBBB`,
              ],
              [
                `outcomeAAAA`,
                `outcomeAAAB`,
                `outcomeAABA`,
                `outcomeAABB`,
                `outcomeABAA`,
                `outcomeABAB`,
                `outcomeABBA`,
                `outcomeABBB`,
                `outcomeBAAA`,
                `outcomeBAAB`,
                `outcomeBABA`,
                `outcomeBABB`,
                `outcomeBBAA`,
                `outcomeBBAB`,
                `outcomeBBBA`,
                `outcomeBBBB`,
              ],
            ]);
          },
          async linksFromState(state) {
            switch (state) {
              case `initial`:
                return [[`initial`, `firstRememberedChoice`]];

              case `firstRememberedChoice`:
                return [
                  [`firstForgottenChoiceA`, `firstForgottenChoiceA`],
                  [`firstForgottenChoiceB`, `firstForgottenChoiceB`],
                ];

              case `firstForgottenChoiceA`:
                return [
                  [`firstRememberedChoiceAA`, `secondRememberedChoiceAA`],
                  [`firstRememberedChoiceAB`, `secondRememberedChoiceAB`],
                ];

              case `firstForgottenChoiceB`:
                return [
                  [`firstRememberedChoiceBA`, `secondRememberedChoiceBA`],
                  [`firstRememberedChoiceBB`, `secondRememberedChoiceBB`],
                ];

              case `secondRememberedChoiceAA`:
                return [
                  [`secondForgottenChoiceAAA`, `secondForgottenChoiceAAA`],
                  [`secondForgottenChoiceAAB`, `secondForgottenChoiceAAB`],
                ];

              case `secondRememberedChoiceAB`:
                return [
                  [`secondForgottenChoiceABA`, `secondForgottenChoiceABA`],
                  [`secondForgottenChoiceABB`, `secondForgottenChoiceABB`],
                ];

              case `secondRememberedChoiceBA`:
                return [
                  [`secondForgottenChoiceBAA`, `secondForgottenChoiceBAA`],
                  [`secondForgottenChoiceBAB`, `secondForgottenChoiceBAB`],
                ];

              case `secondRememberedChoiceBB`:
                return [
                  [`secondForgottenChoiceBBA`, `secondForgottenChoiceBBA`],
                  [`secondForgottenChoiceBBB`, `secondForgottenChoiceBBB`],
                ];

              case `secondForgottenChoiceAAA`:
                return [
                  [`secondRememberedChoiceAAAA`, `outcomeAAAA`],
                  [`secondRememberedChoiceAAAB`, `outcomeAAAB`],
                ];

              case `secondForgottenChoiceBAA`:
                return [
                  [`secondRememberedChoiceBAAA`, `outcomeBAAA`],
                  [`secondRememberedChoiceBAAB`, `outcomeBAAB`],
                ];

              case `secondForgottenChoiceABA`:
                return [
                  [`secondRememberedChoiceABAA`, `outcomeABAA`],
                  [`secondRememberedChoiceABAB`, `outcomeABAB`],
                ];

              case `secondForgottenChoiceBBA`:
                return [
                  [`secondRememberedChoiceBBAA`, `outcomeBBAA`],
                  [`secondRememberedChoiceBBAB`, `outcomeBBAB`],
                ];

              case `secondForgottenChoiceAAB`:
                return [
                  [`secondRememberedChoiceAABA`, `outcomeAABA`],
                  [`secondRememberedChoiceAABB`, `outcomeAABB`],
                ];

              case `secondForgottenChoiceBAB`:
                return [
                  [`secondRememberedChoiceBABA`, `outcomeBABA`],
                  [`secondRememberedChoiceBABB`, `outcomeBABB`],
                ];

              case `secondForgottenChoiceABB`:
                return [
                  [`secondRememberedChoiceABBA`, `outcomeABBA`],
                  [`secondRememberedChoiceABBB`, `outcomeABBB`],
                ];

              case `secondForgottenChoiceBBB`:
                return [
                  [`secondRememberedChoiceBBBA`, `outcomeBBBA`],
                  [`secondRememberedChoiceBBBB`, `outcomeBBBB`],
                ];

              case `outcomeAAAA`:
                return [[`outcomeAAAA`, `initial`]];

              case `outcomeAAAB`:
                return [[`outcomeAAAB`, `initial`]];

              case `outcomeAABA`:
                return [[`outcomeAABA`, `initial`]];

              case `outcomeAABB`:
                return [[`outcomeAABB`, `initial`]];

              case `outcomeABAA`:
                return [[`outcomeABAA`, `initial`]];

              case `outcomeABAB`:
                return [[`outcomeABAB`, `initial`]];

              case `outcomeABBA`:
                return [[`outcomeABBA`, `initial`]];

              case `outcomeABBB`:
                return [[`outcomeABBB`, `initial`]];

              case `outcomeBAAA`:
                return [[`outcomeBAAA`, `initial`]];

              case `outcomeBAAB`:
                return [[`outcomeBAAB`, `initial`]];

              case `outcomeBABA`:
                return [[`outcomeBABA`, `initial`]];

              case `outcomeBABB`:
                return [[`outcomeBABB`, `initial`]];

              case `outcomeBBAA`:
                return [[`outcomeBBAA`, `initial`]];

              case `outcomeBBAB`:
                return [[`outcomeBBAB`, `initial`]];

              case `outcomeBBBA`:
                return [[`outcomeBBBA`, `initial`]];

              case `outcomeBBBB`:
                return [[`outcomeBBBB`, `initial`]];
            }
          },
        };

        gameArtifact = await malfunction(gameSource);
      });

      it(`eliminates all states which are not distinguishable by players`, () => {
        expect(gameArtifact.states.length).toEqual(14);
      });

      it(`includes all of the expected branches`, () => {
        const initial = gameArtifact.states[0];
        expect(initial.state).toEqual(`initial`);
        expect(initial.links).toEqual([
          { link: `initial`, stateIndex: jasmine.any(Number) },
        ]);

        const firstRememberedChoice = gameArtifact.states[
          initial.links[0]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect(firstRememberedChoice.state).toEqual(`firstRememberedChoice`);
        expect(firstRememberedChoice.links).toEqual([
          { link: `firstForgottenChoiceA`, stateIndex: jasmine.any(Number) },
          { link: `firstForgottenChoiceB`, stateIndex: jasmine.any(Number) },
        ]);

        const firstForgottenChoiceA = gameArtifact.states[
          firstRememberedChoice.links[0]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect(`firstForgottenChoiceA`).toEqual(firstForgottenChoiceA.state);
        expect(firstForgottenChoiceA.links).toEqual([
          { link: `firstRememberedChoiceAA`, stateIndex: jasmine.any(Number) },
          { link: `firstRememberedChoiceAB`, stateIndex: jasmine.any(Number) },
        ]);
        expect(firstForgottenChoiceA.links[1]?.stateIndex).toBe(
          firstForgottenChoiceA.links[0]?.stateIndex
        );

        const secondRememberedChoiceA = gameArtifact.states[
          firstForgottenChoiceA.links[0]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect([
          `secondRememberedChoiceAA`,
          `secondRememberedChoiceAB`,
        ]).toContain(secondRememberedChoiceA.state);
        switch (secondRememberedChoiceA.state) {
          case `secondRememberedChoiceAA`:
            expect(secondRememberedChoiceA.links).toEqual([
              {
                link: `secondForgottenChoiceAAA`,
                stateIndex: jasmine.any(Number),
              },
              {
                link: `secondForgottenChoiceAAB`,
                stateIndex: jasmine.any(Number),
              },
            ]);
            break;

          case `secondRememberedChoiceAB`:
            expect(secondRememberedChoiceA.links).toEqual([
              {
                link: `secondForgottenChoiceABA`,
                stateIndex: jasmine.any(Number),
              },
              {
                link: `secondForgottenChoiceABB`,
                stateIndex: jasmine.any(Number),
              },
            ]);
            break;

          default:
            fail(`Unexpected state "${secondRememberedChoiceA.state}"`);
            break;
        }

        const secondForgottenChoiceAA = gameArtifact.states[
          secondRememberedChoiceA.links[0]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect([
          `secondForgottenChoiceAAA`,
          `secondForgottenChoiceABA`,
        ]).toContain(secondForgottenChoiceAA.state);
        expect(secondForgottenChoiceAA.links[1]?.stateIndex).toBe(
          secondForgottenChoiceAA.links[0]?.stateIndex
        );
        switch (secondForgottenChoiceAA.state) {
          case `secondForgottenChoiceAAA`:
            expect(secondForgottenChoiceAA.links).toEqual([
              {
                link: `secondRememberedChoiceAAAA`,
                stateIndex: jasmine.any(Number),
              },
              {
                link: `secondRememberedChoiceAAAB`,
                stateIndex: jasmine.any(Number),
              },
            ]);
            break;

          case `secondForgottenChoiceABA`:
            expect(secondForgottenChoiceAA.links).toEqual([
              {
                link: `secondRememberedChoiceABAA`,
                stateIndex: jasmine.any(Number),
              },
              {
                link: `secondRememberedChoiceABAB`,
                stateIndex: jasmine.any(Number),
              },
            ]);
            break;

          default:
            fail(`Unexpected state "${secondForgottenChoiceAA.state}"`);
            break;
        }

        const outcomeAA = gameArtifact.states[
          secondForgottenChoiceAA.links[0]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect([
          `outcomeAAAA`,
          `outcomeABAA`,
          `outcomeAAAB`,
          `outcomeABAB`,
        ]).toContain(outcomeAA.state);
        switch (outcomeAA.state) {
          case `outcomeAAAA`:
            expect(outcomeAA.links).toEqual([
              {
                link: `outcomeAAAA`,
                stateIndex: 0,
              },
            ]);
            break;

          case `outcomeAAAB`:
            expect(outcomeAA.links).toEqual([
              {
                link: `outcomeABAA`,
                stateIndex: 0,
              },
            ]);
            break;

          case `outcomeABAA`:
            expect(outcomeAA.links).toEqual([
              {
                link: `outcomeAAAB`,
                stateIndex: 0,
              },
            ]);
            break;

          case `outcomeABAB`:
            expect(outcomeAA.links).toEqual([
              {
                link: `outcomeABAB`,
                stateIndex: 0,
              },
            ]);
            break;

          default:
            fail(`Unexpected state "${outcomeAA.state}"`);
            break;
        }

        const secondForgottenChoiceAB = gameArtifact.states[
          secondRememberedChoiceA.links[1]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect([
          `secondForgottenChoiceAAB`,
          `secondForgottenChoiceABB`,
        ]).toContain(secondForgottenChoiceAB.state);
        expect(secondForgottenChoiceAB.links[1]?.stateIndex).toBe(
          secondForgottenChoiceAB.links[0]?.stateIndex
        );
        switch (secondForgottenChoiceAB.state) {
          case `secondForgottenChoiceAAB`:
            expect(secondForgottenChoiceAB.links).toEqual([
              {
                link: `secondRememberedChoiceAABA`,
                stateIndex: jasmine.any(Number),
              },
              {
                link: `secondRememberedChoiceAABB`,
                stateIndex: jasmine.any(Number),
              },
            ]);
            break;

          case `secondForgottenChoiceABB`:
            expect(secondForgottenChoiceAB.links).toEqual([
              {
                link: `secondRememberedChoiceABBA`,
                stateIndex: jasmine.any(Number),
              },
              {
                link: `secondRememberedChoiceABBB`,
                stateIndex: jasmine.any(Number),
              },
            ]);
            break;

          default:
            fail(`Unexpected state "${secondForgottenChoiceAB.state}"`);
            break;
        }

        const outcomeAB = gameArtifact.states[
          secondForgottenChoiceAB.links[0]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect([
          `outcomeAABA`,
          `outcomeABBA`,
          `outcomeAABB`,
          `outcomeABBB`,
        ]).toContain(outcomeAB.state);
        switch (outcomeAB.state) {
          case `outcomeAABA`:
            expect(outcomeAB.links).toEqual([
              {
                link: `outcomeAABA`,
                stateIndex: 0,
              },
            ]);
            break;

          case `outcomeAABB`:
            expect(outcomeAB.links).toEqual([
              {
                link: `outcomeABBA`,
                stateIndex: 0,
              },
            ]);
            break;

          case `outcomeABBA`:
            expect(outcomeAB.links).toEqual([
              {
                link: `outcomeAABB`,
                stateIndex: 0,
              },
            ]);
            break;

          case `outcomeABBB`:
            expect(outcomeAB.links).toEqual([
              {
                link: `outcomeABBB`,
                stateIndex: 0,
              },
            ]);
            break;

          default:
            fail(`Unexpected state "${outcomeAA.state}"`);
            break;
        }

        const firstForgottenChoiceB = gameArtifact.states[
          firstRememberedChoice.links[1]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect(`firstForgottenChoiceB`).toEqual(firstForgottenChoiceB.state);
        expect(firstForgottenChoiceB.links).toEqual([
          { link: `firstRememberedChoiceBA`, stateIndex: jasmine.any(Number) },
          { link: `firstRememberedChoiceBB`, stateIndex: jasmine.any(Number) },
        ]);
        expect(firstForgottenChoiceB.links[1]?.stateIndex).toBe(
          firstForgottenChoiceB.links[0]?.stateIndex
        );

        const secondRememberedChoiceB = gameArtifact.states[
          firstForgottenChoiceB.links[0]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect([
          `secondRememberedChoiceBA`,
          `secondRememberedChoiceBB`,
        ]).toContain(secondRememberedChoiceB.state);
        switch (secondRememberedChoiceB.state) {
          case `secondRememberedChoiceBA`:
            expect(secondRememberedChoiceB.links).toEqual([
              {
                link: `secondForgottenChoiceBAA`,
                stateIndex: jasmine.any(Number),
              },
              {
                link: `secondForgottenChoiceBAB`,
                stateIndex: jasmine.any(Number),
              },
            ]);
            break;

          case `secondRememberedChoiceBB`:
            expect(secondRememberedChoiceB.links).toEqual([
              {
                link: `secondForgottenChoiceBBA`,
                stateIndex: jasmine.any(Number),
              },
              {
                link: `secondForgottenChoiceBBB`,
                stateIndex: jasmine.any(Number),
              },
            ]);
            break;

          default:
            fail(`Unexpected state "${secondRememberedChoiceB.state}"`);
            break;
        }

        const secondForgottenChoiceBA = gameArtifact.states[
          secondRememberedChoiceB.links[0]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect([
          `secondForgottenChoiceBAA`,
          `secondForgottenChoiceBBA`,
        ]).toContain(secondForgottenChoiceBA.state);
        expect(secondForgottenChoiceBA.links[1]?.stateIndex).toBe(
          secondForgottenChoiceBA.links[0]?.stateIndex
        );
        switch (secondForgottenChoiceBA.state) {
          case `secondForgottenChoiceBAA`:
            expect(secondForgottenChoiceBA.links).toEqual([
              {
                link: `secondRememberedChoiceBAAA`,
                stateIndex: jasmine.any(Number),
              },
              {
                link: `secondRememberedChoiceBAAB`,
                stateIndex: jasmine.any(Number),
              },
            ]);
            break;

          case `secondForgottenChoiceBBA`:
            expect(secondForgottenChoiceBA.links).toEqual([
              {
                link: `secondRememberedChoiceBBAA`,
                stateIndex: jasmine.any(Number),
              },
              {
                link: `secondRememberedChoiceBBAB`,
                stateIndex: jasmine.any(Number),
              },
            ]);
            break;

          default:
            fail(`Unexpected state "${secondForgottenChoiceBA.state}"`);
            break;
        }

        const outcomeBA = gameArtifact.states[
          secondForgottenChoiceBA.links[0]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect([
          `outcomeBAAA`,
          `outcomeBBAA`,
          `outcomeBAAB`,
          `outcomeBBAB`,
        ]).toContain(outcomeBA.state);
        switch (outcomeBA.state) {
          case `outcomeBAAA`:
            expect(outcomeBA.links).toEqual([
              {
                link: `outcomeBAAA`,
                stateIndex: 0,
              },
            ]);
            break;

          case `outcomeBAAB`:
            expect(outcomeBA.links).toEqual([
              {
                link: `outcomeBBAA`,
                stateIndex: 0,
              },
            ]);
            break;

          case `outcomeBBAA`:
            expect(outcomeBA.links).toEqual([
              {
                link: `outcomeBAAB`,
                stateIndex: 0,
              },
            ]);
            break;

          case `outcomeBBAB`:
            expect(outcomeBA.links).toEqual([
              {
                link: `outcomeBBAB`,
                stateIndex: 0,
              },
            ]);
            break;

          default:
            fail(`Unexpected state "${outcomeBA.state}"`);
            break;
        }

        const secondForgottenChoiceBB = gameArtifact.states[
          secondRememberedChoiceB.links[1]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect([
          `secondForgottenChoiceBAB`,
          `secondForgottenChoiceBBB`,
        ]).toContain(secondForgottenChoiceBB.state);
        expect(secondForgottenChoiceBB.links[1]?.stateIndex).toBe(
          secondForgottenChoiceBB.links[0]?.stateIndex
        );
        switch (secondForgottenChoiceBB.state) {
          case `secondForgottenChoiceBAB`:
            expect(secondForgottenChoiceBB.links).toEqual([
              {
                link: `secondRememberedChoiceBABA`,
                stateIndex: jasmine.any(Number),
              },
              {
                link: `secondRememberedChoiceBABB`,
                stateIndex: jasmine.any(Number),
              },
            ]);
            break;

          case `secondForgottenChoiceBBB`:
            expect(secondForgottenChoiceBB.links).toEqual([
              {
                link: `secondRememberedChoiceBBBA`,
                stateIndex: jasmine.any(Number),
              },
              {
                link: `secondRememberedChoiceBBBB`,
                stateIndex: jasmine.any(Number),
              },
            ]);
            break;

          default:
            fail(`Unexpected state "${secondForgottenChoiceBB.state}"`);
            break;
        }

        const outcomeBB = gameArtifact.states[
          secondForgottenChoiceBB.links[0]?.stateIndex as number
        ] as GameArtifactState<State, Link>;
        expect([
          `outcomeBABA`,
          `outcomeBBBA`,
          `outcomeBABB`,
          `outcomeBBBB`,
        ]).toContain(outcomeBB.state);
        switch (outcomeBB.state) {
          case `outcomeBABA`:
            expect(outcomeBB.links).toEqual([
              {
                link: `outcomeBABA`,
                stateIndex: 0,
              },
            ]);
            break;

          case `outcomeBABB`:
            expect(outcomeBB.links).toEqual([
              {
                link: `outcomeBBBA`,
                stateIndex: 0,
              },
            ]);
            break;

          case `outcomeBBBA`:
            expect(outcomeBB.links).toEqual([
              {
                link: `outcomeBABB`,
                stateIndex: 0,
              },
            ]);
            break;

          case `outcomeBBBB`:
            expect(outcomeBB.links).toEqual([
              {
                link: `outcomeBBBB`,
                stateIndex: 0,
              },
            ]);
            break;

          default:
            fail(`Unexpected state "${outcomeBA.state}"`);
            break;
        }
      });
    });

    describe(`when compiling a game of tug-of-war`, () => {
      let gameArtifact: GameArtifact<TugOfWarState, TugOfWarLink>;

      beforeAll(async () => {
        gameArtifact = await malfunction(tugOfWarGameSource);
      });

      it(`does not link to any states which are not in the list`, () => {
        for (const state of gameArtifact.states) {
          for (const link of state.links) {
            expect(link.stateIndex).toBeGreaterThanOrEqual(0);
            expect(link.stateIndex).toBeLessThan(gameArtifact.states.length);
          }
        }
      });

      it(`does not list any unlinked states`, () => {
        for (let index = 0; index < gameArtifact.states.length; index++) {
          let found = false;

          for (const linkingState of gameArtifact.states) {
            for (const link of linkingState.links) {
              if (link.stateIndex === index) {
                found = true;
                break;
              }
            }
          }

          expect(found).toBeTrue();
        }
      });

      it(`passes a fuzz test`, () => {
        let expectedState = 0;

        let gameArtifactState = gameArtifact.states[0];

        for (let i = 0; i < 10000; i++) {
          expect(gameArtifactState?.state).toEqual(
            expectedState as TugOfWarState
          );

          const expectedLinks: TugOfWarLink[] = [`reset`];

          if (expectedState > -5 && expectedState < 5) {
            expectedLinks.push(`pullLeft`, `pullRight`);
          }

          expect(gameArtifactState?.links.map((link) => link.link)).toEqual(
            expectedLinks
          );

          const link =
            gameArtifactState?.links[
              Math.floor(Math.random() * expectedLinks.length)
            ];

          switch (link?.link) {
            case `reset`:
              expectedState = 0;
              break;

            case `pullLeft`:
              expectedState--;
              break;

            case `pullRight`:
              expectedState++;
              break;
          }

          gameArtifactState = gameArtifact.states[
            link?.stateIndex as number
          ] as GameArtifactState<TugOfWarState, TugOfWarLink>;
        }
      });
    });

    describe(`when compiling a game of tic-tac-toe`, () => {
      let gameArtifact: GameArtifact<TicTacToeState, TicTacToeLink>;

      beforeAll(async () => {
        gameArtifact = await malfunction(ticTacToeGameSource);
      });

      it(`does not link to any states which are not in the list`, () => {
        for (const state of gameArtifact.states) {
          for (const link of state.links) {
            expect(link.stateIndex).toBeGreaterThanOrEqual(0);
            expect(link.stateIndex).toBeLessThan(gameArtifact.states.length);
          }
        }
      });

      it(`does not list any unlinked states`, () => {
        for (let index = 0; index < gameArtifact.states.length; index++) {
          let found = false;

          for (const linkingState of gameArtifact.states) {
            for (const link of linkingState.links) {
              if (link.stateIndex === index) {
                found = true;
                break;
              }
            }
          }

          expect(found).toBeTrue();
        }
      });

      it(`passes a fuzz test`, () => {
        const expectedGrid: [
          [Tile, Tile, Tile],
          [Tile, Tile, Tile],
          [Tile, Tile, Tile]
        ] = [
          [`unclaimed`, `unclaimed`, `unclaimed`],
          [`unclaimed`, `unclaimed`, `unclaimed`],
          [`unclaimed`, `unclaimed`, `unclaimed`],
        ];

        let next: PlayerTile = `player1`;

        let gameArtifactState = gameArtifact.states[0];

        for (let i = 0; i < 10000; i++) {
          expect(gameArtifactState?.state.grid).toEqual(expectedGrid);

          const expectedLinks: TicTacToeLink[] = [
            {
              type: `reset`,
            },
          ];

          let won = false;

          for (const player of [`player1`, `player2`]) {
            for (let j = 0; j < 3; j++) {
              for (let k = 0; k < 3; k++) {
                if (expectedGrid[j]?.[k] === player) {
                  if (k === 2) {
                    won = true;
                  }
                } else {
                  break;
                }
              }

              for (let k = 0; k < 3; k++) {
                if (expectedGrid[k]?.[j] === player) {
                  if (k === 2) {
                    won = true;
                  }
                } else {
                  break;
                }
              }
            }

            for (let j = 0; j < 3; j++) {
              if (expectedGrid[j]?.[j] === player) {
                if (j === 2) {
                  won = true;
                }
              } else {
                break;
              }
            }

            for (let j = 0; j < 3; j++) {
              if (expectedGrid[2 - j]?.[j] === player) {
                if (j === 2) {
                  won = true;
                }
              } else {
                break;
              }
            }
          }

          if (!won) {
            for (let j = 0; j < 3; j++) {
              for (let k = 0; k < 3; k++) {
                if (expectedGrid[j]?.[k] === `unclaimed`) {
                  expectedLinks.push({
                    type: `claim`,
                    row: j as RowOrColumnIndex,
                    column: k as RowOrColumnIndex,
                  });
                }
              }
            }
          }

          expect(gameArtifactState?.links.map((link) => link.link)).toEqual(
            expectedLinks
          );

          const link =
            gameArtifactState?.links[
              Math.floor(Math.random() * expectedLinks.length)
            ];

          switch (link?.link.type) {
            case `claim`:
              expectedGrid[link?.link.row][link?.link.column] = next;
              next = next === `player1` ? `player2` : `player1`;
              break;

            case `reset`:
              for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                  (expectedGrid[j] as Tile[])[k] = `unclaimed`;
                }
              }

              next = `player1`;
              break;
          }

          gameArtifactState = gameArtifact.states[
            link?.stateIndex as number
          ] as GameArtifactState<TicTacToeState, TicTacToeLink>;
        }
      });
    });
  });
});
