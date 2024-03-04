import { Router } from "express";
import {getReporte ,getVentasTotales, getSingleVenta} from '../controllers/reportes.controller.js'

const router = Router();


router.get("/reportesMultiples" , getReporte)
router.get("/reportesMultiples/ventasTotales" , getVentasTotales)
router.get("/reportesMultiples/DetalleVenta/:id" , getSingleVenta)


export default router;