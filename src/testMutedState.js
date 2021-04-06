const { setLightStateById } = require("./setLightStateById");
const connectToHueAPI = require("./connectToHueApi");
const getLightIDByName = require("./getLightIDByName");
const { mutedState } = require("./lightStates");
const { USERNAME, LIGHT_NAME } = require("../config");

async function testMutedState() {
  const api = await connectToHueAPI(USERNAME);
  const lightID = await getLightIDByName(LIGHT_NAME, api);
  setLightStateById(lightID, mutedState, api);
}

module.exports = testMutedState;
