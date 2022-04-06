const util = require("util");
const exec = util.promisify(require("child_process").exec);
const spawn = require("child_process").spawn;
const fs = require("fs");
const path = require("path");
const writeFile = util.promisify(fs.writeFile);
const deleteChainSh = path.resolve(__dirname, "../sh-scripts/delete-chain.sh");
const createAccountsSh = path.resolve(
  __dirname,
  "../sh-scripts/create-account.sh"
);
const initHttpSh = path.resolve(__dirname, "../sh-scripts/init-http.sh");
const initWsSh = path.resolve(__dirname, "../sh-scripts/init-ws.sh");
const startHttpSh = path.resolve(
  __dirname,
  "../sh-scripts/run-console-http.sh"
);
const startWsSh = path.resolve(__dirname, "../sh-scripts/run-console-ws.sh");
const genesisPath = path.resolve(__dirname, "../Genesis.json");
const jsPath = path.resolve(__dirname, "./custom");
const PASSWORD = "test";

const deleteChain = async () => {
  try {
    const { stderr, stdout } = await exec(`yes | ${deleteChainSh}`);
    console.log(stdout);
    console.error(stderr);
  } catch (error) {
    throw error;
  }
};

const createAccounts = async (accounts, inGenesis) => {
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const balance = account.balance;
    try {
      const { stderr, stdout } = await exec(`${createAccountsSh} ${PASSWORD}`);
      console.log(stdout);
      console.error(stderr);
      const address = stdout
        .split("Public address of the key:   ")[1]
        .substring(0, 42);
      inGenesis.alloc[address] = { balance: balance };
      if (i === 0) {
        inGenesis.coinbase = address;
      }
    } catch (error) {
      throw error;
    }
  }
  return inGenesis;
};

const initHttp = async (networkId, port) => {
  try {
    const { stderr, stdout } = await exec(
      `${initHttpSh} ${genesisPath} --${networkId} --${port}`
    );
    console.log(stdout);
    console.error(stderr);
  } catch (error) {
    throw error;
  }
};

const initWs = async (networkId, port, origin) => {
  try {
    const { stderr, stdout } = await exec(
      `${initWsSh} ${genesisPath} --${networkId} --${port} --${origin}`
    );
    console.log(stdout);
    console.error(stderr);
  } catch (error) {
    throw error;
  }
};

const writeGenesis = async json => {
  await writeFile(genesisPath, JSON.stringify(json, null, 2));
};

const start = async (startType, networkId, port, scriptsDir) => {
  try {
    const options = [];
    if (scriptsDir) {
      const preloads = fs.readdirSync(path.resolve(__dirname, scriptsDir));
      options.push(
        ...[networkId, port, "--jspath", jsPath, "--preload", preloads]
      );
    } else {
      options.push(...[networkId, port]);
    }
    console.log(
      `starting ${startType} server with options ${JSON.stringify(options)}`
    );
    const command = startType === "http" ? startHttpSh : startWsSh;
    spawn(`${command}`, options, { detached: true, stdio: "inherit" });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAccounts,
  deleteChain,
  initHttp,
  initWs,
  writeGenesis,
  start
};
