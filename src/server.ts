import express from 'express'
import router from './router'
import swaggerUi from 'swagger-ui-express'
const swaggerFile = require('./swagger_output.json')
const cors = require('cors');

import rateLimit from 'express-rate-limit'
import slowDown from "express-slow-down";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10
})

const speedLimiter = slowDown({
    windowMs: 60 * 1000,
    delayAfter: 1,
    delayMs: 500
});

const app = express();

app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    const allowedOrigins = ['http://localhost:3003', 'http://api-design-tracker.onrender.com', 'https://api-design-tracker.onrender.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
  });
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.set('trust proxy', 1);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("static"))

app.use("/api", speedLimiter, limiter, router, () => {
    /* #swagger.tags = ['Order'] 
     */
});

app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' })
    } else if (err.type === 'input') {
        if (err.code === 'P2002') {
            res.status(409).json({ message: 'User already exist' })
        }
        res.status(400).json({ message: 'invalid input' })
    } else {
        res.status(500).json({ message: 'internal server error' })
    }
})

export default app