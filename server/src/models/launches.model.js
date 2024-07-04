const launches = new Map();
// const launches = require("./launches.mongo")

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchesWithId(launchId) {
  return launches.has(launchId);
}

function getAllLaunches() {
  return launches;
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["Zero to Mystery", "NASA"],
      flightNumber: latestFlightNumber,
    })
  );
}

function abortLaunchById(launchId) {
  const aborted = launch.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchesWithId,
  abortLaunchById,
};
