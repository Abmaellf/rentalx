/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */

import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";
import { RateLimiterRedis, RateLimiterRes } from "rate-limiter-flexible";

import { AppError } from "@shared/errors/AppError";

let rateLimiter: RateLimiterRedis | null = null;

const redisClient = new Redis({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
});

redisClient.on("error", (error: any) => {
    console.warn("redis error", error);
});

const opts = {
    storeClient: redisClient,
    points: 5, // Number of total points
    duration: 5, // Per second(s)
    execEvenly: false, // Do not delay actions evenly
    blockDuration: 0, // Do not block the caller if consumed more than points
    keyPrefix: "ensrl", // Assign unique keys for each limiters with different purposes
};

rateLimiter = new RateLimiterRedis(opts);

export async function rateLimitMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (!rateLimiter) {
        return next();
    }

    const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    try {
        await rateLimiter.consume(clientIP as string);
        next();
    } catch (error) {
        if (error instanceof RateLimiterRes) {
            throw new AppError("Too many requests", 429);
        } else {
            console.error("An unexpected error occurred:", error);
            next(error);
        }
    }
}