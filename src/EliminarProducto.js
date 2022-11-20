import { query } from "./db.js";
import Joi from "joi";
export const querySchemaDeleteProducto = Joi.object({
  id: Joi.required(),
});
export default async function (req, res) {
  try {
    const { id } = req.body;
    let [exist] = await query(
      `SELECT id FROM existencia_productos WHERE id = ${id};`
    );
    if (exist) {
      await query(`DELETE FROM existencia_productos WHERE id=${id};`);
      res.status(200).json({ data: "Ok" });
    } else {
      res.status(404).json({ data: "Este producto no existe" });
    }
  } catch (e) {
    res.status(500).json({ data: e.message });
  }
}
