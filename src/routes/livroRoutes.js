import { Router } from "express"

// Import controllers
import { buscarLivro, 
        cadastrarLivro, 
        deletarLivros, 
        editarLivros,
        getLivros 
        } from "../controllers/livroController.js";

const router = Router();

//Livros
router.get('/', getLivros);
router.post('/criar', cadastrarLivro);
router.get("/:id", buscarLivro);
router.put('/editar/:id', editarLivros);
router.delete('/remover/:id', deletarLivros);

export default router;