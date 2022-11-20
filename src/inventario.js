import { query } from "./db.js";
export default async function (req, res) {
  try {
    const list =
      await query(`SELECT p.id, p.marca, p.modelo, count(ALL producto_id) as cantidad
      FROM productos as p
      LEFT JOIN existencia_productos as ep
      ON p.id = ep.producto_id
      GROUP BY p.id;`);
    return res.json({ data: list });
  } catch (e) {
    return res.status(500).json({ data: e.message });
  }
}
