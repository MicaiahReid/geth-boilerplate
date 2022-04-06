# Geth Boilerplate

The purpose of this project is to provide some easy-to-use startup scripts to get a local geth node up and running for personal testing.

## System Requirements

To use this project, your system must be able to run `.sh` scripts.

## Installation

Clone this repo and [install geth](https://geth.ethereum.org/docs/install-and-build/installing-geth).

## Usage

To start off, run `npm run init` from the root of this project.

This will:

- Create new eth accounts with password "test", storing the account data in `./db/keystore`.
  - A new account is made for each entry in the `settings.json`'s `accounts` array.
- Generate a `Genesis.json`, which is used to setup the initial state of your geth chain.
  - The generated `Genesis.json` uses the `template-genesis.json` file as a baseline.
  - The new accounts will be added to the `"alloc"` section of the `Genesis.json`, with an initial balance that can be adjusted in the `settings.json`.

Next, run `npm run start`. This command initializes geth based off of the `Genesis.json` and runs `geth console`. Geth should now be running with a set of funded accounts.

### Preloaded Scripts

Any files added to the `./js-scripts/custom` directory will be preloaded when geth is started. This will make these js scripts available for use in the console. With the console running, simply type one of the script's function names and that function will be run.

### Additional commands:

#### `npm run reset`

Alias for `npm run init`

#### `npm run start:http` / `npm run start`

Starts geth with the HTTP-RPC server enabled, listening at the port specified in the `settings.json`.

#### `npm run start:ws`

Starts geth with the WS-RPC server enabled, listening at the port specified in the `settings.json`.

#### `npm run restart:http` / `npm run restart`

Runs `npm run reset` followed by `npm run start:http`.

#### `npm run restart:ws`

Runs `npm run reset` followed by `npm run start:ws`.
