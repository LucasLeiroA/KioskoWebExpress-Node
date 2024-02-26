import { Router } from "express";
import {getVentas, search} from '../controllers/ventas.controller.js'

const router = Router();

router.get("/ventas",getVentas);
router.post("/ventas/filter",search);


export default router;