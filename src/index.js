import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { registraRutas } from "./rutas.js";
import "./db.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());

registraRutas(app);

const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

export default app;
