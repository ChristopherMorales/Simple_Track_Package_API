import express from 'express'
import router from './router'


import { protect } from './modules/auth'
import { createNewUser, signin } from "./handlers/user";


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("static"))

app.use("/api", protect, router);

app.post("/signup", createNewUser);
app.post("/login", signin);

export default app