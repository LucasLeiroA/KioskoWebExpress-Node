import { Router } from "express";
import {getReporte , getSingleVenta , getVentaDate ,getVentasMes,getVentasContadoDate ,getVentasTransferenciaDate , getVentasMesContado,getVentasMesTransferencia} from '../controllers/reportes.controller.js'

const router = Router();


router.get("/reportesMultiples" , getReporte)
router.get("/reportesMultiples/DetalleVenta/:url/:fecha/:id" , getSingleVenta)
router.get("/reportesMultiples/ventasPorFecha/:fecha",getVentaDate )
router.get("/reportesMultiples/ventasPorFechaContado/:fecha",getVentasContadoDate )
router.get("/reportesMultiples/VentasPorFechaTransferencia/:fecha",getVentasTransferenciaDate )
router.get("/reportesMultiples/ventasPorMes/:mes",getVentasMes )
router.get("/reportesMultiples/ventasPorMesContado/:mes",getVentasMesContado)
router.get("/reportesMultiples/ventasPorMesContadoTransfencia/:mes",getVentasMesTransferencia)
export default router;