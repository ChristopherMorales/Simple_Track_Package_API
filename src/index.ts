import * as dotenv from "dotenv";
import config from './config'
import app from './server'

dotenv.config();

app.listen(config.port, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})

app.get("/", (req,res) => {
    res.json({message: 'ok'})
});