import { Router } from "express";
import {getVentas, search,searchClient , addVenta } from '../controllers/ventas.controller.js'

const router = Router();

router.get("/ventas",getVentas);
router.post("/ventas/filter",search);
router.post("/ventas/clientes",searchClient)
router.get("/ventas/add/:idProducto/:quantityProduct/:montoTotal",addVenta)


export default router;