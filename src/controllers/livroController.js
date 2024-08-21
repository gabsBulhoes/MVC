import conn from "../config/conn.js"
import { v4 as uuidv4} from 'uuid';
import { response } from "express";


export const getLivros = (request, response) => {

};
export const cadastrarLivro = (request, response) => {
    const {titulo, autor, ano_publicacao, genero, preco} = request.body

    //validações
    if(!titulo){
    response.status(400).json({err:"O Título é obrigatório"});
    return;
    }
    if(!autor){
    response.status(400).json({err:"O autor é obrigatório"});
    return;
    }
    if(!ano_publicacao){
    response.status(400).json({err:" O ano publicação é obrigatório"});
    return;
    }
    if(!genero){
    response.status(400).json({err:"O genêro é obrigatório"});
    return;
    }
    if(!preco){
    response.status(400).json({err:"O preço é obrigatório"});
    return;
    }
    // Verificar se o livro não foi cadastrado
    const checkSql = /*sql*/ ` SELECT * FROM livros WHERE titulo = "{titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}"`
    conn.query(checkSql,(err, data) => {
        if(err){
            console.error(err)
            response.status(500).json({err:"Erro ao buscar livros"})
            return
        }
        if(data.length > 0){
            response.status(409).json({err:"Livro já foi cadastrado"})
            return
        }
        //Cadastraro o livro
        const id = uuidv4()
        const disponibilidade = 1
        const insertSql = /*sql*/ `INSERT INRO livros
        (id,titulo, autor, ano_publicacao, genero, preco, 
        disponibilidade) 
        VALUES 
        ("${id}","${titulo}","${autor}","${ano_publicacao}","${genero}", 
        "${preco}","${disponibilidade}")
        `;
        conn.query(insertSql, (err)=>{
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao cadastrar livro"})
                return
            }
            response.status(201).json({message: "Livro cadastrado"})
        })
    });
}
export const buscarLivro = (request, response) => {
    const {id} = request.params

    const sql = /*sql*/ `SELECT * FROM livros WHERE livro_id = "${id}"`;
    conn.query(sql , (err, data)=>{
    if(err){
        console.log.error(err)
        response.status(500).json({err:"Erro ao buscar livro"})
        return
    }
    if(data.length === 0 ){
        response.status(404).json({err:"Livro não encontrado"})
        return
    }
    const livro = data[0]
    response.status(200).json(livro)
})
}
export const editarLivros = (request, response) => {
    const {id} = request.params
    const {titulo, autor, ano_publicacao, genero, preco, 
        disponibilidade} = request.body

        if(titulo === undefined){
        response.status(400).json({err:"O Título é obrigatório"});
        return;
        }
        if(autor === undefined){
        response.status(400).json({err:"O autor é obrigatório"});
        return;
            }
        if(ano_publicacao === undefined){
        response.status(400).json({err:" O ano publicação é obrigatório"});
        return;
        }
        if(genero === undefined){
        response.status(400).json({err:"O genêro é obrigatório"});
        return;
        }
        if(preco === undefined){
        response.status(400).json({err:"O preço é obrigatório"});
            return;
        }
        if(disponibilidade === undefined){
        response.status(400).json({err:"A disponibilidade é obrigatória"});
        return;
        }
        const sql = /*sql*/ `SELECT * FROM livros WHERE livro_id = "${id}"`;
        conn.query(sql , (err, data)=>{
        if(err){
            console.log.error(err)
            response.status(500).json({err:"Erro ao buscar livro"})
            return
        }
        if(data.length === 0 ){
            response.status(404).json({err:"Livro não encontrado"})
            return
        }
        const updateSql = /*sql*/ ` UPDATE livroa SET titulo = "${titulo}", autor = "${autor}", ano_publicacao = "${ano_publicacao}", genero = "${genero}", 
        preco = "${preco}", disponibilidade = "${disponibilidade}"
        WHERE livro_id = "${id}"
        `
        conn(updateSql, (err)=>{
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao atualizar livro"})
                return
            }
            console.log(info)
            response.status(200).json({message:"Livro atualizado"})
        })
    })
}
export const deletarLivros = (request, response) => {
    const {id} = request.params

    const deleteSql = /*sql*/` DELETE FROM livros WHERE livro_id = "${id}"`
    conn.query(deleteSql, (err, info)=>{
    if(err){
        console.error(err)
        response.status(500).json({err: "Erro ao deletar livro"})
        return
    }
    if(info.affectedRows === 0){
        response.status(404).json({err:"Livro não encontrado"})
        return
    }
    response.status(200).json("Livro deletado")
})
}