import { getConecction } from "../database/conecction.js"


export const getReporte = (req,res) => {
   res.render('reportesMultiples/reporteMultiple.ejs')
}


   export const getVentasTotales = async (req,res) => {
       const  pool = await getConecction();
       const result = await pool.request().query("select venta_id,venta_nro,DATEPART(DAY,venta_fecha) as 'venta_dia' ,DATEPART(MONTH,venta_fecha) as 'venta_mes' , DATEPART(YEAR,venta_fecha) as 'venta_anio' , estadoVenta_id,tipoVenta_id,venta_montoTotal  from venta");
       const ventas = result.recordset;
       let venta_fecha;
       ventas.map((e) => {
      
         
         switch (e.tipoVenta_id) {
            case 1:
               e.tipoVenta_id = e.tipoVenta_id.toString() 
               e.tipoVenta_id = "Contado"
               break;
            case 2:
            e.tipoVenta_id = e.tipoVenta_id.toString() 
            e.tipoVenta_id = "Cuenta Corriente"
            break;
            case 3:
            e.tipoVenta_id = e.tipoVenta_id.toString() 
            e.tipoVenta_id = "Transferencia/Tarjeta"
            break;  
         }
         switch (e.estadoVenta_id) {
            case 1:
               e.estadoVenta_id = e.estadoVenta_id.toString() 
               e.estadoVenta_id = "Habilitada"
               break;
            case 2:
            e.estadoVenta_id = e.estadoVenta_id.toString() 
            e.estadoVenta_id = "Anulada"
            break;
         }
          venta_fecha = `${e.venta_dia}/${e.venta_mes}/${e.venta_anio}`
         

       }) 
  
       res.render('reportesMultiples/reporteVentasTotales.ejs' , {ventas:ventas,fechaVenta:venta_fecha})
}



export const getSingleVenta = async (req , res) => {

   const id_venta = req.params.id;


   const pool =  await getConecction();
  const result = await pool.request().query(`SELECT cliente_id,DATEPART(HOUR,venta_fecha) as 'venta_hora',DATEPART(MINUTE,venta_fecha) as 'venta_minute' ,DATEPART(DAY,venta_fecha) as 'venta_dia' ,DATEPART(MONTH,venta_fecha) as 'venta_mes' , DATEPART(YEAR,venta_fecha) as 'venta_anio',venta.cliente_id, venta.venta_nro,venta.venta_fecha,venta.venta_montoTotal,detalle_venta.articulo_id,detalle_venta.cantidad,detalle_venta.precioVenta,detalle_venta.subtotal
  FROM venta
  INNER JOIN detalle_venta ON venta.venta_id = detalle_venta.venta_id where venta.venta_id = ${parseInt(id_venta)}`);

   const items = result.recordset;


   var data = [];
   let montoTotal = 0;
   for (const i of items) {
      const productName = await pool.request().query(`
      select articulo_nombre from articulo where articulo_id = ${i.articulo_id}`);
      let pro = productName.recordset;
      montoTotal = montoTotal + i.subtotal;
      let newData = {
         'articulo':pro[0].articulo_nombre,
         subtotal:i.subtotal,
         venta_nro:i.venta_nro,
         venta_montoTotal:i.venta_montoTotal,
         cantidad:i.cantidad,
         precioVenta:i.precioVenta,
      } 
      data.push(newData)
   }
   let clientId = items[0].cliente_id[0];

   let venta_fecha= `${(items[0].venta_dia<10?'0':'') + items[0].venta_dia}/${(items[0].venta_mes<10?'0':'')+items[0].venta_mes}/${items[0].venta_anio}`
   let venta_hora =`${(items[0].venta_hora<10?'0':'')+items[0].venta_hora}:${(items[0].venta_minute < 10?'0':'') +items[0].venta_minute}`
   if (clientId) {
   
      let clientName = (await pool.request().query(`select cliente_nombre,cliente_apellido from cliente where cliente_id =${clientId}`)).recordset
      let nomYape = `${clientName[0].cliente_nombre} ${clientName[0].cliente_apellido}`
      console.log(nomYape);
       res.render('reportesMultiples/reporteDetalleVenta.ejs',{venta:data , fechaVenta:venta_fecha ,venta_hora:venta_hora, montoTotal:montoTotal,clientName:nomYape})
   }else{
       res.render('reportesMultiples/reporteDetalleVenta.ejs',{venta:data , fechaVenta:venta_fecha ,venta_hora:venta_hora, montoTotal:montoTotal,clientName:undefined})

   }



}