# Malfunction [![Continuous Integration](https://github.com/jameswilddev/malfunction/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/malfunction/actions) [![License](https://img.shields.io/github/license/jameswilddev/malfunction.svg)](https://github.com/jameswilddev/malfunction/blob/master/license) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fmalfunction.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fmalfunction?ref=badge_shield) [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

Computes all possible states of a procedurally-generated finite state machine
and performs simple optimizations to eliminate duplicate states.

Originally written to generate state machines for simple web browser games, but
may have other uses.

## Installation

### Dependencies

This is a NPM package without any runtime NPM dependencies.  It targets NodeJS
16.11.1 or newer on the following operating systems:

- Ubuntu 20.04
- Ubuntu 18.04
- macOS 11 (Big Sur)
- macOS 10.15 (Catalina)
- Windows Server 2022
- Windows Server 2019
- Windows Server 2016

It is likely also possible to use this package as part of a web browser
application through tools such as [webpack](https://webpack.js.org/).  This has
not been tested, however.

### Install as a runtime dependency

If your application uses Malfunction as a runtime dependency, install it like
any other NPM package:

```bash
npm install --save malfunction
```

### Install as a development dependency

If Malfunction is used when building your application and not at runtime,
install it as a development dependency:

```bash
npm install --save-dev malfunction
```

## Usage

First, you must define a game source object which describes your finite state
machine.  This project provides some examples:

- [Tug of War](./examples/tug-of-war/index.ts).
- [Tic-Tac-Toe](./examples/tic-tac-toe/index.ts).

A game source object includes:

- An initial game state from which to start.
- A function which compares two game states to determine whether they represent
  the same game state.
- A function which compares two game states to determine whether they would
  appear identical to the player(s).
- A function which compares two links to determine whether they would appear
  identical to player(s).
- A function which lists the links from a game state to other game states.

From this, the `malfunction` function will crawl the entire graph of possible
choices and generate a list of the distinct game states which were identified:

```typescript
import { malfunction } from "malfunction";

const gameArtifact = malfunction(gameSource);

console.log(gameArtifact);
```

```
{
  states: [
    {
      state: `Example Game State A`,
      links: [
        {
          link: `Example Link A`,
          stateIndex: 1234,
        },
        ...
      ],
    },
    ...
  ],
}
```
