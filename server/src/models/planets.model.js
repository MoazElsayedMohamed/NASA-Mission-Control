const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const planets = require("./planets.mongo");

// const habitablePlanets = [];

const isHabitable = (planet) => {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
};

// Helpers
const parser = parse({
  // options
  comment: "#",
  columns: true, // now each row will be treaded as a js-object (key-value)
});

function loadPlanetsData() {
  // createReadStream --> deal with each row (stream) alone so that we can deal with scalable size --> using streams to handle data as it comes-in
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(parser)
      .on("data", (data) => {
        if (isHabitable(data)) {
          // habitablePlanets.push(data); // results are RAW-Buffers of Bytes so we need to parse it
          savePlanet(data);
        }
      })
      .on("err", () => {
        console.log("found an error 🤦‍♀️");
        reject(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`found ${countPlanetsFound} planets that are habitable`);
        console.log("done processing files");

        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find(
    {},
    {
      id: 0,
      __v: 0,
    }
  );
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save planet: ${err}`);
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
