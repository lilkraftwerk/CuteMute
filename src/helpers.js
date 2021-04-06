require("dotenv").config();
const prompts = require("prompts");
const { readConfigFile } = require("./configFileUtils");

const listLightNames = require("./listLightNames");
const testMutedState = require("./testMutedState");
const testUnmutedState = require("./testUnmutedState");

// suppress node API library warnings

async function helperMenu() {
  const config = await readConfigFile();
  if (config == null) {
    console.log("No config file found. Run `node run setup` first.");
    return;
  }
  const { USERNAME, LIGHT_NAME, CHECK_INTERVAL } = config;

  const choices = [
    { title: "test muted light state", value: "testMuted" },
    { title: "test unmuted light state", value: "testUnmuted" },
    { title: "list all lights", value: "listLights" },
  ];

  const intervalPrompt = {
    type: "select",
    message: "Choose an action",
    name: "intervalValue",
    choices,
  };

  const { intervalValue } = await prompts(intervalPrompt);
  console.log(intervalValue);

  if (intervalValue === "testMuted") {
    testMutedState();
  }

  if (intervalValue === "testUnmuted") {
    testUnmutedState();
  }

  if (intervalValue === "listLights") {
    listLightNames();
  }
}

helperMenu();
