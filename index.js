import express from "express";
import bodyParser from "body-parser";
import cron from "node-cron"
import connectDB from "./config/db.js"
import fetchAndSave from "./utils/fetchNews.js";
import newsRoutes from "./routes/newsRoutes.js"
import cors from "cors";


const app  = express();

const PORT = 4000;

app.use(bodyParser.json());

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

connectDB();

app.use(express.json());





app.use("/",newsRoutes)

// cron.schedule("0 */6 * * *", () => {
//     fetchAndSave();
// });

app.listen(PORT,()=>{
    console.log("Server is running");
})


export default app;
