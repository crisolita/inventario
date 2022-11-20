import { query } from "./db.js";
export default async function (req, res) {
  try {
    const list =
      await query(`SELECT ep.id, p.id as producto_id, p.marca, p.modelo, ep.serial, ep.descripcion, ep.bien_publico
    FROM productos as p
    INNER JOIN existencia_productos as ep
    ON p.id = ep.producto_id;`);
    return res.json({ data: list });
  } catch (e) {
    return res.status(500).json({ data: e.message });
  }
}
