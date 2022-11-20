import { query } from "./db.js";
import Joi from "joi";
export const querySchemaEditExistencia = Joi.object({
  id: Joi.required(),
  serial: Joi.string().required(),
  descripcion: Joi.string().required(),
  bien_publico: Joi.string().required(),
});
export default async function (req, res) {
  try {
    {
      const { id, serial, descripcion, bien_publico } = req.body;
      let [exist] = await query(
        `SELECT id FROM existencia_productos WHERE id = ${id};`
      );
      if (exist) {
        await query(
          `UPDATE existencia_productos SET serial="${serial}",descripcion="${descripcion}",bien_publico="${bien_publico}" WHERE id=${id};`
        );
        exist = await query(`SELECT * FROM existencia_productos;`);
        res.status(200).json(exist);
      } else {
        res.status(400).json({ data: "Este producto no existe" });
      }
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}
