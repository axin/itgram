import {
    getNameConverter,
    Session,
    snakeToCamelCaseConversion,
    TypedData,
    withRetries,
    Ydb,
} from "ydb-sdk";
import { logger } from "../common/logger.js";
import {
    CHANNELS_AND_GROUPS_TABLE,
    getChannelsAndGroupsData,
} from "./tables/channels-and-groups/channels-and-groups.js";
import { CITIES_TABLE, getCitiesData } from "./tables/cities/cities.js";
import {
    contentTypesData,
    CONTENT_TYPES_TABLE,
} from "./tables/content-types/content-types.js";
import { getTopicsData, TOPICS_TABLE } from "./tables/topics/topics.js";
import { getRowType } from "./utils/get-row-type.js";
import { QueryGenerator } from "./utils/QueryGenerator.js";

export async function fillTables(session: Session) {
    const tables = new Map([
        [
            CHANNELS_AND_GROUPS_TABLE,
            {
                data: getChannelsAndGroupsData(),
                calculatedColumns: {
                    channel_or_group_id: "Digest::Md5Hex(username)",
                },
            },
        ],
        [
            CITIES_TABLE,
            {
                data: getCitiesData(),
            },
        ],
        [
            TOPICS_TABLE,
            {
                data: getTopicsData(),
            },
        ],
        [
            CONTENT_TYPES_TABLE,
            {
                data: contentTypesData(),
            },
        ],
    ]);

    for (const [tableName, { data, calculatedColumns }] of tables) {
        const queryGenerator = new QueryGenerator(
            tableName,
            getRowType(data),
            calculatedColumns
        );
    }

    let query = "";
    const queryParams: Record<string, Ydb.ITypedValue> = {};

    for (const [tableName, { data, calculatedColumns }] of tableData) {
        const rowType = data.type?.listType?.item as
            | ReturnType<TypedData["getRowType"]>
            | undefined;

        if (rowType) {
            const dataParamName = `$${converter(tableName)}Data`;

            query += createReplaceQuery(
                tableName,
                dataParamName,
                rowType,
                calculatedColumns
            );

            queryParams[dataParamName] = data;
        }
    }

    async function fillTable() {
        logger.info("Inserting data to tables, preparing query...");
        logger.info(query);

        const preparedQuery = await session.prepareQuery(query);

        logger.info("Query has been prepared, executing...");

        await session.executeQuery(preparedQuery, queryParams);
    }

    await withRetries(fillTable);
}
