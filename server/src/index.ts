import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';// import after dotenv

dotenv.config(); // always load before using process.env

const app = express();
app.use(cors());
app.use(express.json()); // this is CRITICAL — it parses req.body!

app.use('/', router);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
