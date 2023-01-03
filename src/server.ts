import express from 'express'
import router from './router'

import { protect } from './modules/auth'
import { createNewUser, signin } from "./handlers/user";

import rateLimit from 'express-rate-limit'
import slowDown from "express-slow-down";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 4
})

const speedLimiter = slowDown({
    windowMs: 60 * 1000,
    delayAfter: 1,
    delayMs: 1000
});

const app = express();

app.set('trust proxy', 1);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("static"))

app.use("/api", protect, speedLimiter, limiter, router);

app.post("/signup", speedLimiter, limiter, createNewUser);
app.post("/login", speedLimiter, limiter, signin);

app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' })
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'invalid input' })
    } else {
        res.status(500).json({ message: 'internal server error' })
    }
})

export default app