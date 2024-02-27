import { Router } from "express";
import {getVentas, search,searchClient} from '../controllers/ventas.controller.js'

const router = Router();

router.get("/ventas",getVentas);
router.post("/ventas/filter",search);
router.post("/ventas/clientes",searchClient)


export default router;