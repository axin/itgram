import type { Session } from "ydb-sdk";
import { logger } from "../common/logger.js";
import {
    channelsAndGroupsDescription,
    CHANNELS_AND_GROUPS_TABLE,
} from "./tables/channels-and-groups/channels-and-groups.js";
import { citiesDescription, CITIES_TABLE } from "./tables/cities/cities.js";
import {
    contentTypesDescription,
    CONTENT_TYPES_TABLE,
} from "./tables/content-types/content-types.js";
import { topicsDescription, TOPICS_TABLE } from "./tables/topics/topics.js";

export async function createTables(session: Session) {
    logger.info("Creating tables...");

    await session.createTable(
        CHANNELS_AND_GROUPS_TABLE,
        channelsAndGroupsDescription
    );

    await session.createTable(CITIES_TABLE, citiesDescription);
    await session.createTable(TOPICS_TABLE, topicsDescription);
    await session.createTable(CONTENT_TYPES_TABLE, contentTypesDescription);
}
