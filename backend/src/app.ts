import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
// import { connect } from "./database/connection";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
// connect();

app.use(routes);

export default app;