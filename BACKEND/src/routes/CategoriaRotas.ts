import { Router } from "express";
import { CategoriaController } from "../controllers/CategoriaController";

const router = Router()

router.get("/categorias", CategoriaController.getAll)
router.get("/categorias/nome", CategoriaController.getByNome)
router.post("/categorias", CategoriaController.create)
router.put("/categorias/:id", CategoriaController.update)
router.delete("/categorias/id/:id", CategoriaController.delete)


export default router