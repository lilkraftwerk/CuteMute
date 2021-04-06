const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function getZoomMuteStatus() {
  const { error, stdout } = await exec("osascript ./lib/zoom-status.scpt");
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  const status = JSON.parse(stdout);
  let muteStatus;
  if (status.mute == "unmuted") {
    muteStatus = "unmuted";
  } else {
    muteStatus = "muted";
  }
  return Promise.resolve(muteStatus);
}

module.exports = getZoomMuteStatus;
