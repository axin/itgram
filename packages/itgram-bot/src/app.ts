import process from "node:process";
import { logger } from "./services/logger.js";

function handleExit(signal: NodeJS.Signals) {
    logger.info(`Exiting with signal ${signal}...`);
}

process.once("SIGINT", handleExit);
process.once("SIGTERM", handleExit);
