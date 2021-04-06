const v3 = require("node-hue-api").v3;
const LightState = v3.lightStates.LightState;

const unmutedState = new LightState().on().rgb(255, 0, 0);
const mutedState = new LightState().off();

module.exports = { unmutedState, mutedState };
