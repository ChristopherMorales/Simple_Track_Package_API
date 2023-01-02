import * as dotenv from "dotenv";
import app from './server'


const express = require("express");
const port = process.env.PORT || 3000;
const path = require("path");


dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})

app.get("/", (req,res) => {
    res.JSON({message: 'ok'})
});