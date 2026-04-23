import express from 'express'; // require ki jagah import
import router from "./routes/routes.js";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import cors from "cors"

dotenv.config(); // env file load 
const app = express();

app.use(cors()); // CORS middleware
app.use(express.json());


app.use('/api', router);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});