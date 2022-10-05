import { pino } from "pino";

export const logger = pino({
    level: process.env.ITGRAM_LOGLEVEL || "info",
});

export type { Logger } from "pino";
