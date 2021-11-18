import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import cook from "./cook";
import event from "./event";
import dish from "./dish";
import tag from "./tag";

export default createSchema({
  name: "kochrundeSchema",
  types: schemaTypes.concat([event, dish, cook, tag]),
});
