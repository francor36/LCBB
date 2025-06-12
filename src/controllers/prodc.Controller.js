import { getConnection } from "../database/database.js";
import { request, response } from "express";
import { v4 as uuidv4 } from 'uuid';


const getProduct = async (req = request, res = response) => {
    try {

        //creacion de la la conexion
        const connection = await getConnection();

        const [product, fields] = await connection.query('SELECT * FROM productos')

        res.status(200).json({ ok: true, result: product, msg: 'Approved' });

    } catch (err) {
        res.status(400).json({ ok: false, err, msg: 'Some error' })
    }
};

const createProduct = async (req = request, res = response) => {
    try {
        const connection = await getConnection();
        const id = uuidv4(); // genera un UUID
        const { nombre, stock, categoria_id, unidad_Producto } = req.body;

        if (!nombre || !stock || !categoria_id || !unidad_Producto) {
            return res.status(400).json({ ok: false, msg: "Faltan datos" });
        }

        // Buscar la categoría por nombre (aca se usa categoria_id como nombre)
        const [rows] = await connection.query("SELECT id FROM categorias WHERE nombre = ?;", [categoria_id]);

        if (rows.length > 0) {
            const categoriaRealId = rows[0].id;

            await connection.query(
                "INSERT INTO productos (id, nombre, stock, categoria_id, unidad_Producto) VALUES (?, ?, ?, ?, ?)",
                [id, nombre, stock, categoriaRealId, unidad_Producto]
            );

            return res.json({ ok: true, msg: "Producto creado con éxito" });
        } else {
            return res.status(400).json({ ok: false, msg: "Categoría no encontrada" });
        }
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, msg: "Error en el servidor" });
    }
};
export const productController = { getProduct, createProduct };