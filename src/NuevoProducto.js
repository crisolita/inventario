import { query } from "./db.js";
import Joi from "joi";
export const querySchemaProducto = Joi.object({
  marca: Joi.string().required(),
  modelo: Joi.string().required(),
});
export default async function (req, res) {
  try {
    const { marca, modelo } = req.body;
    await query(
      `INSERT INTO productos (marca,modelo) VALUES ("${marca}","${modelo}") ;`
    );
    return res.json({ data: "ok" });
  } catch (e) {
    return res.status(500).json(e.message);
  }
}
