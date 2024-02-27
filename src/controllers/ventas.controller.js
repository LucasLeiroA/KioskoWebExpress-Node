import { getConecction } from "../database/conecction.js"
import sql from 'mssql'

var fecha  = new Date()
var day = fecha.getDate();
var mes = fecha.getMonth();
var anio = fecha.getFullYear();

var today = `${day}/${mes}/${anio}`

export const getVentas = async (req,res) => {

  
   
    const pool = await getConecction();
    const result = await pool.request().query('select * from categoria inner join articulo on categoria.categoria_id = articulo.categoria_id'); 
    const ventas = await pool.request().query('select * from venta'); 
 
    res.render('venta/venta.ejs' , {data: result.recordset ,fecha:today ,numFact:ventas.recordset.NumFactura + 1})
  
   
}


export const search = async (req , res) =>{

    const pool = await getConecction();
    const artSearch = req.body.busqueda;
    const result = await pool.request().query('select * from categoria inner join articulo on categoria.categoria_id = articulo.categoria_id where articulo_nombre LIKE '+"'"+artSearch+"%'")
    res.render('venta/venta.ejs' , {data: result.recordset , fecha:today})
}


export const searchClient = async(req , res) =>{
    const pool = await getConecction();
    const clientSearch = req.body.cliente;
    const result = await pool.request().query('select * from cliente where cliente_nombre LIKE '+"'"+clientSearch+"%'");
    res.render('venta/ventaClients.ejs',{clientes:result.recordset})

}