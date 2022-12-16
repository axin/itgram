import ydb from "ydb-sdk";
import { logger } from "../common/logger.js";

const authService = ydb.getCredentialsFromEnv();
const { ITGRAM_ENDPOINT: endpoint, ITGRAM_DATABASE: database } = process.env;

logger.info("Initializing db driver...");
logger.info(`endpoint: ${endpoint}, database: ${database}`);

export const driver = new ydb.Driver({ endpoint, database, authService });
const timeout = 10000;

if (!(await driver.ready(timeout))) {
    logger.fatal(`Driver has not become ready in ${timeout}ms!`);
    process.exit(1);
} else {
    logger.info("DB driver successfully initialized");
}
