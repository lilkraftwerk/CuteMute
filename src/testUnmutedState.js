const { setLightStateById } = require("./setLightStateById");
const connectToHueAPI = require("./connectToHueApi");
const getLightIDByName = require("./getLightIDByName");
const { unmutedState } = require("./lightStates");
const { USERNAME, LIGHT_NAME } = require("../config");

async function testUnmutedState() {
  const api = await connectToHueAPI(USERNAME);
  const lightID = await getLightIDByName(LIGHT_NAME, api);
  setLightStateById(lightID, unmutedState, api);
}

module.exports = testUnmutedState;
