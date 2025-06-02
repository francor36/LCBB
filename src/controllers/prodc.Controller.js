import { getConnection } from "../database/database.js";
import { request, response } from "express";

const getProduct = async (req=request, res=response) => {
try{

    //creacion de la la conexion
    const connection = await getConnection();

    const [product, fields] = await connection.query('SELECT * FROM productos')

    res.status(200).json({ ok: true, result: product, msg: 'Approved'});

} catch(err){
    res.status(400).json({ok: false, err, msg: 'Some error'})
}
};

export const productController = {getProduct};