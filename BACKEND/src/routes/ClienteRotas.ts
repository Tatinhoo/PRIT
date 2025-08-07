import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";

const router = Router()

router.get("/clientes", ClienteController.getAll)
router.post("/clientes", ClienteController.create)
router.get("/clientes/id/:id", ClienteController.getById)
router.put("/clientes/:id", ClienteController.update)

router.delete("/clientes/:id", ClienteController.delete)
router.get("/clientes/cpf/:cpf", ClienteController.getByCPF)

export default router