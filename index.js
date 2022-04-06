const {
  accounts,
  port,
  networkId,
  origin,
  scriptsDir
} = require("./settings.json");
const templateGenesis = require("./template-genesis.json");
const {
  createAccounts,
  deleteChain,
  initHttp,
  initWs,
  writeGenesis,
  start
} = require("./js-scripts/helpers");

async function main() {
  for (var i = 0; i < process.argv.length; i++) {
    switch (process.argv[i]) {
      case "reset":
        await resetChain();
        break;
      case "start-http":
        await startChainHttp();
        break;
      case "start-ws":
        await startChainWs();
        break;
    }
  }
}

const resetChain = async () => {
  await deleteChain();

  const genesis = await createAccounts(accounts, templateGenesis);

  await writeGenesis(genesis);
};

const startChainHttp = async () => {
  await initHttp(networkId, port);
  await start("http", networkId, port, scriptsDir);
};

const startChainWs = async () => {
  await initWs(networkId, port, origin);
  await start("ws", networkId, port, scriptsDir);
};

main();
