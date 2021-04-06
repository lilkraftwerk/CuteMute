const prompts = require("prompts");
const box = require("cli-box");

// suppress node API library warnings
require("dotenv").config();

const {
  createConfigFile,
  readConfigFile,
  writeConfigFile,
} = require("./configFileUtils");
const discoverAndCreateUser = require("../lib/discoverAndCreateHueUser");
const connectToHueAPI = require("./connectToHueApi");
const getAllLights = require("./getAllLights");

const message = (content) => {
  const messageBox = box("80x3", content);
  console.log("\n");
  console.log(messageBox);
};

async function createLocalUser() {
  message("Press the link button on your Hue bridge now, then confirm.");

  const linkPrompt = {
    type: "toggle",
    name: "hasPressedSyncButton",
    message: "I have pressed the link button on my Hue bridge.",
    initial: false,
    active: "yes",
    inactive: "no",
  };

  const { hasPressedSyncButton } = await prompts(linkPrompt);

  if (hasPressedSyncButton === false) {
    console.log("Aborting...");
    return false;
  }

  try {
    const { username } = await discoverAndCreateUser();
    const currentConfig = readConfigFile();
    const newConfig = {
      ...currentConfig,
      USERNAME: username,
    };
    writeConfigFile(newConfig);
    message("successfully created user");
  } catch (e) {
    return false;
  }
}

async function selectLightName() {
  try {
    const config = await readConfigFile();
    const { USERNAME } = config;
    const api = await connectToHueAPI(USERNAME);
    const allLights = await getAllLights(api);
    const choices = allLights.map((thisLight) => {
      return { title: thisLight.data.name, value: thisLight.data.name };
    });

    message("Select the active light");

    const selectPrompt = {
      type: "select",
      message: "Light name:",
      name: "value",
      choices,
      initial: 0,
    };

    const selectedLight = await prompts(selectPrompt);
    const newConfig = {
      ...config,
      LIGHT_NAME: selectedLight.value,
    };

    writeConfigFile(newConfig);
  } catch (e) {
    console.log("Error when selecting light.");
    return false;
  }
}

async function setZoomPingInterval() {
  const config = await readConfigFile();
  const { CHECK_INTERVAL } = config;

  const choices = [
    { title: "0.25", value: 250 },
    { title: "0.5", value: 500 },
    { title: "1", value: 1000 },
    { title: "3", value: 3000 },
    { title: "5", value: 5000 },
    { title: "10", value: 10000 },
    { title: "15", value: 15000 },
    { title: "20", value: 20000 },
  ];

  const intervalPrompt = {
    type: "select",
    message: "Zoom ping interval in seconds:",
    name: "intervalValue",
    choices,
    initial: 500,
  };

  const { intervalValue } = await prompts(intervalPrompt);
  if (intervalValue !== CHECK_INTERVAL) {
    const newConfig = {
      ...config,
      CHECK_INTERVAL: intervalValue,
    };
    writeConfigFile(newConfig);
  }
}

async function fullSetupMenu() {
  message("zoomhue setup program initiated...");
  let config = await readConfigFile();

  if (config == null) {
    await createConfigFile();
    config = await readConfigFile();
  }

  console.log("current config:");
  console.log(config);

  const { USERNAME, LIGHT_NAME } = config;
  if (USERNAME == null) {
    message("No username found. Creating username...");
    const userResult = await createLocalUser();
    if (userResult === false) {
      return;
    }
  } else {
    const usernameExistsPrompt = {
      type: "toggle",
      name: "shouldOverwriteUsername",
      message: "Overwrite current Hue bridge key?",
      initial: false,
      active: "yes",
      inactive: "no",
    };

    message("Hue bridge key exists.");

    const { shouldOverwriteUsername } = await prompts(usernameExistsPrompt);
    if (shouldOverwriteUsername === true) {
      await createLocalUser();
    }
  }

  if (LIGHT_NAME == null) {
    await selectLightName();
  } else {
    const lightExistsPrompt = {
      type: "toggle",
      name: "shouldUpdateLight",
      message: "Select a new light?",
      initial: 0,
      active: "yes",
      inactive: "no",
    };

    const { shouldUpdateLight } = await prompts(lightExistsPrompt);

    if (shouldUpdateLight === true) {
      await selectLightName();
    }
  }

  const updateCheckIntervalPrompt = {
    type: "toggle",
    name: "shouldUpdateInterval",
    message: "Update the Zoom app ping interval?",
    initial: 0,
    active: "yes",
    inactive: "no",
  };

  const { shouldUpdateInterval } = await prompts(updateCheckIntervalPrompt);

  if (shouldUpdateInterval === true) {
    await setZoomPingInterval();
  }
}

fullSetupMenu();
