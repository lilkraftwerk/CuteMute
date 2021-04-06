async function getAllLights(api) {
  try {
    const allLights = await api.lights.getAll();
    return Promise.resolve(allLights);
  } catch (e) {
    return Promise.reject("Failed to retrieve all lights.");
  }
}

module.exports = getAllLights;
