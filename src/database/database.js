import mysql from 'mysql2/promise';
import { envs } from "../config/envs.js";

export const getConnection = async () => {
    const connection = await mysql.createConnection({
        host: envs.DB_HOST,
        port: envs.PORT,
        user: envs.DB_USER,
        password: "",
        database: envs.DATABASE
    });

    console.log('connected to database');
    return connection
}