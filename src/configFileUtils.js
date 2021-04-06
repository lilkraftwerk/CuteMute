const fs = require("fs");
const path = require("path");
const box = require("cli-box");
const util = require("util");

// suppress node API library warnings

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const CONFIG_PATH = path.resolve("./", "config.json");

const CONFIG_DEFAULTS = {
  USERNAME: null,
  LIGHT_NAME: null,
  CHECK_INTERVAL: 500,
};

const message = (content) => {
  const messageBox = box("80x3", content);
  console.log("\n");
  console.log(messageBox);
};

// read, write, create config file

async function readConfigFile() {
  try {
    const data = await readFile(CONFIG_PATH, "utf8");
    const parsed = JSON.parse(data);
    return parsed;
  } catch (e) {
    return null;
  }
}

async function writeConfigFile(newConfig) {
  await writeFile(CONFIG_PATH, JSON.stringify(newConfig, null, 2));
}

async function createConfigFile(overwrite = false) {
  if (fs.existsSync(CONFIG_PATH) && overwrite === false) {
    message("file exists. returning");
    return;
  }
  message("creating default config file");
  writeConfigFile(CONFIG_DEFAULTS);
}

module.exports = { readConfigFile, writeConfigFile, createConfigFile };
