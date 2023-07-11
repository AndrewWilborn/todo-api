import {onRequest} from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { getTasks , addTask, updateTask} from "./tasks.js";


const app = express();
app.use(cors());
app.use(express.json());

// routes:
// app.get('/function/:arg1/:arg2/:arg3', getFunction)
app.get('/tasks/:uid', getTasks);
app.post('/tasks', addTask);
app.patch('/tasks', updateTask);

export const api = onRequest(app);