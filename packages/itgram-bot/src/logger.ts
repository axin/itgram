import { pino, Logger } from "pino";

export const logger = pino({
    level: process.env.ITGRAM_LOGLEVEL || "info",
});

export { Logger };
