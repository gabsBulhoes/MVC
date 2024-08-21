import conn from "../config.conn.js";

const tableLivros = /*sql*/ `
    CREATE TABLE IF NOT EXISTS livros(
        livro_id VARCHAR(60) PRIMARY_KEY,
        titulo VARCHAR(255) NOT NULL,
        autor VARCHAR (255) NOT NULL,
        ano_publicacao YEAR (4) NOT NULL,
        genero VARCHAR (255) NOT NULL,
        preco VARCHAR (255) NOT NULL,
        disponibilidade BOOLEAN,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`
    
conn.query(tableLivros, (err, result, field)=>{
    if(err){
        console.log("Erro ao criar a tabela"+err.stack)
        return
    }
    console.log("Tabela [Livros] criada com sucesso")
})