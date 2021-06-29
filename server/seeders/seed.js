const db = require("../config/connection");
const { User, SkeetScore, TrapScore } = require("../models");
const userSeeds = require("./userSeeds.json");
const skeetSeeds = require("./skeetScoreSeeds.json");
const trapSeeds = require("./trapScoreSeeds.json");

db.once("open", async () => {
  try {
    await SkeetScore.deleteMany({});
    await TrapScore.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < skeetSeeds.length; i++) {
      const { _id, thoughtAuthor } = await SkeetScore.create(skeetSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
    for (let i = 0; i < trapSeeds.length; i++) {
      const { _id, thoughtAuthor } = await TrapScore.create(trapSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
