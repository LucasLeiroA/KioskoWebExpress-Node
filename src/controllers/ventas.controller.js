import { getConecction } from "../database/conecction.js"
import sql from 'mssql'



export const getVentas = async (req,res) => {

  


    const pool = await getConecction();
    const result = await pool.request().query('select * from categoria inner join articulo on categoria.categoria_id = articulo.categoria_id'); 
    res.render('venta/venta.ejs' , {data: result.recordset})
  
   
}


export const search = async (req , res) =>{

    const pool = await getConecction();
    const artSearch = req.body.busqueda;
    const result = await pool.request().query('select * from categoria inner join articulo on categoria.categoria_id = articulo.categoria_id where articulo_nombre LIKE '+"'"+artSearch+"%'")
    res.render('venta/venta.ejs' , {data: result.recordset})
}