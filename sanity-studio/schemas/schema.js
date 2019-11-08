// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// import schemas
import friend from "./friend";
import round from "./round";
import dish from "./dish";
import season from "./season";

export default createSchema({
  name: "kochrundeSchema",
  types: schemaTypes.concat([friend, round, dish, season]),
});
