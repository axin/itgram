import type { Session } from "ydb-sdk";
import { logger } from "../common/logger.js";
import { CHANNELS_AND_GROUPS_TABLE } from "./tables/channels-and-groups/channels-and-groups.js";
import { CITIES_TABLE } from "./tables/cities/cities.js";
import { CONTENT_TYPES_TABLE } from "./tables/content-types/content-types.js";
import { TOPICS_TABLE } from "./tables/topics/topics.js";

export async function dropTables(session: Session) {
    logger.info("Dropping old tables...");

    await session.dropTable(CHANNELS_AND_GROUPS_TABLE);
    await session.dropTable(CITIES_TABLE);
    await session.dropTable(TOPICS_TABLE);
    await session.dropTable(CONTENT_TYPES_TABLE);
}
