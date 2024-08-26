import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import newsRoutes from './routes/newsRoutes.js';
import cors from 'cors';

const app = express();
const PORT = 4000;

// CORS configuration
// Allow requests from any origin

const corsOptions = {
    origin: 'https://news-panda.netlify.app',
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };


app.use(cors(corsOptions)); 
app.use(bodyParser.json());

connectDB();

// Ensure this line is placed after the CORS configuration
app.use(express.json());

app.use('/', newsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
