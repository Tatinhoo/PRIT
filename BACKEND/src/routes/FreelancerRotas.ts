// VAI SE FUDER SEU ARROMBADO DO CARALHO


import { Router } from "express";
import { FreelancerController } from "../controllers/FreelancerController";
const router = Router()

router.get("/freelancers", FreelancerController.getAll)
router.post("freelancers", FreelancerController.create)