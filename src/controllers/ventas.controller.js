import { getConecction } from "../database/conecction.js"
import { LocalStorage } from "node-localstorage";
global.localStorage = new LocalStorage('./scratch');
import sql from 'mssql'

var fecha  = new Date()
var day = fecha.getDate();
var mes = fecha.getMonth();
var anio = fecha.getFullYear();

var today = `${day}/${mes}/${anio}`

export const getVentas = async (req,res) => {

  
   
    const pool = await getConecction();
    const result = await pool.request().query('select * from categoria inner join articulo on categoria.categoria_id = articulo.categoria_id'); 
  
 
    res.render('venta/venta.ejs' , {data: result.recordset ,fecha:today })
  
   
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


export const addVenta = async (req ,res ) => {

    const pool = await getConecction();
    
//     traemos los parametros de la URL
    const idProduc = (req.params.idProducto).split(",")
    const quantity = (req.params.quantityProduct).split(",")
    const montoTotal = (req.params.montoTotal)

    // array para guardas todos los productos del carrito
    

    //obteniendo el ultimo numero de factura
    let lastFacNum = (await pool.request().query(`SELECT TOP 1 venta_nro FROM venta ORDER BY venta_id DESC`)).recordset; 
    
    //validando para que si trae un null se iguale a 0 por si es el primer registro
    if (lastFacNum == "") {

        lastFacNum = 1
    

    }else{
        lastFacNum = parseInt(JSON.stringify(lastFacNum[0].venta_nro))  + 1 
    }
   

    
    // insertando la nueva venta 

  await pool.request().query(`insert into venta(venta_nro,venta_montoTotal,estadoVenta_id,tipoVenta_id) values(${lastFacNum},${montoTotal},1,1)`);

  let lastVenta = (await pool.request().query(`SELECT TOP 1 venta_id FROM venta ORDER BY venta_id DESC`)).recordset;

    if (lastVenta == "") {

        lastVenta = 1


    }else{
        lastVenta = parseInt(JSON.stringify(lastVenta[0].venta_id))
    }
    
    var products =  []

    for (let i = 0; i < idProduc.length; i++) {
    
    let product = (await pool.request().query(`select * from articulo where articulo_id = ${idProduc[i]}`)).recordset;

    products.push(product)

        
         console.log(parseInt(quantity[i]));
    
        //console.log(parseInt(idProduc[i]) + 1);
        //console.log(lastVenta);
        //console.log(parseInt(idProduc[i]));
        //console.log(product[0].articulo_precioVenta);
        
        //console.log((product[0].articulo_precioVenta)*parseInt(quantity[i]));
        
        
      await pool.request().query(`insert into detalle_venta (venta_id,articulo_id,precioVenta,cantidad,subtotal) values(${lastVenta},${parseInt(idProduc[i])},${product[0].articulo_precioVenta},${parseInt(quantity[i]) },${(product[0].articulo_precioVenta)*parseInt(quantity[i])})`);
    
    
  }

  
  
    res.send(products) 
 

}