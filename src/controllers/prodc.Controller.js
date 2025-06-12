import { getConnection } from "../database/database.js";
import { request, response } from "express";


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

        const { nombre, stock, categoria_id, unidad_por_caja } = req.body;


    } catch (error) {

    }
}
export const productController = { getProduct, createProduct };