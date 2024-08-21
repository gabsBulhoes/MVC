import {request, response} from 'express';
import conn from '../config/conn.js';

export const buscarLivros = (request, response =>{
    const {id} = request.params
    const checkSql = /*sql*/ ` SELECT * FROM clientes WHERE ?? = ?`;
    const checkData = ["cliente_id", id];
    conn.query(checkSql,checkData, (err,data)=>{
        if(err){
            console.error(err);
            response.status(500).json({message:"Erro ao buscar clientes"})
            return;
        }
        const cliente = data[0];
        response.status(200).json(cliente)
    }) 
})