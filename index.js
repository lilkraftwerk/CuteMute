require("dotenv").config();
const getZoomMuteStatus = require("./src/getZoomMuteStatus");
const { setLightStateById } = require("./src/setLightStateById");
const connectToHueAPI = require("./src/connectToHueApi");
const getLightIDByName = require("./src/getLightIDByName");
const { unmutedState, mutedState } = require("./src/lightStates");
const { USERNAME, LIGHT_NAME, CHECK_INTERVAL } = require("./config");

let currentStatus;

async function checkZoomLoop(api, lightID) {
  const zoomStatus = await getZoomMuteStatus();
  if (zoomStatus !== currentStatus) {
    currentStatus = zoomStatus;
    console.log(`Status changed to ${zoomStatus}`);
  }
  currentStatus = zoomStatus;
  if (zoomStatus === "unmuted") {
    setLightStateById(lightID, unmutedState, api);
  } else {
    setLightStateById(lightID, mutedState, api);
  }
}

async function startLoop() {
  try {
    const api = await connectToHueAPI(USERNAME);
    const lightID = await getLightIDByName(LIGHT_NAME, api);
    checkZoomLoop(api, lightID);

    setInterval(() => {
      checkZoomLoop(api, lightID);
    }, CHECK_INTERVAL);
  } catch (e) {
    console.log("Failed to start Zoom check loop.");
  }
}

startLoop();
