import { getConnection } from "../database/database.js";
import { request, response } from "express";

const getMov = async (req=request, res=response) => {
try{

    //creacion de la la conexion
    const connection = await getConnection();

    const [mov, fields] = await connection.query('SELECT * FROM movimientos')

    res.status(200).json({ ok: true, result: mov, msg: 'Approved'});

} catch(err){
    res.status(400).json({ok: false, err, msg: 'Some error'})
}
};

export const movController = {getMov};