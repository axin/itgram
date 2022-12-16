import { driver } from "./db.js";
import { dropTables } from "./drop-tables.js";
import { createTables } from "./create-tables.js";
import { fillTables } from "./fill-tables.js";

await driver.tableClient.withSession(async (session) => {
    await dropTables(session);
    await createTables(session);
    await fillTables(session);
});
