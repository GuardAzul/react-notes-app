import { Router } from "express";
import { noteController } from "../../../container";

const router = Router();

router.get("/:id", noteController.getNotes)
router.get("/:id", noteController.getById)
router.post("/:id", noteController.create)
router.delete("/:id", noteController.delete)

export default router;