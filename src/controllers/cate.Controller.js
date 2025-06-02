import { getConnection } from "../database/database.js";
import { request, response } from "express";

const getCate = async (req=request, res=response) => {
try{

    //creacion de la la conexion
    const connection = await getConnection();

    const [cate, fields] = await connection.query('SELECT * FROM categorias')

    res.status(200).json({ ok: true, result: cate, msg: 'Approved'});

} catch(err){
    res.status(400).json({ok: false, err, msg: 'Some error'})
}
};

export const cateController = {getCate};