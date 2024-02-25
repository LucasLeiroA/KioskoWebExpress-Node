import { getConecction } from "../database/conecction.js"
import sql from 'mssql'
import { validationResult } from "express-validator";



export const getProducts = async (req,res) => {
    const pool = await getConecction();
    
    const result = await pool.request().query('select * from categoria inner join articulo on categoria.categoria_id = articulo.categoria_id');
    
    res.render('registrarStock/articulos.ejs' , {data: result.recordset})
    
}

export const saveProduct = async (req,res) => {

    const pool = await getConecction();

    
    const result = await pool.request().query('select * from categoria inner join articulo on categoria.categoria_id = articulo.categoria_id');
    var dataArticulo = result.recordset;
    
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const valores = req.body;
        const validaciones = error.array()
        return res.render('registrarStock/articulos.ejs' , {data: dataArticulo,validaciones:validaciones,valores:valores})
       
    }
    
    try {
        
         await pool.request()
        .input('articulo',sql.VarChar, req.body.articulo)
        .input('cantidad',sql.SmallInt, req.body.cantidad)
        .input('categoria',sql.Int, req.body.categoria)
        .input('precioCompra',sql.Money ,req.body.precioCompra)
        .input('precioVenta',sql.Money,req.body.precioVenta)
        .query('insert into articulo (articulo_nombre,articulo_cantidad,categoria_id,articulo_precioCompra,articulo_precioVenta) values (@articulo,@cantidad,@categoria,@precioCompra,@precioVenta)');
        
    } catch (error) {
        res.status(500);
        res.send(error.message + 'gola como');
    }
    
    res.redirect('/registrarStock')

}
export const deleteProduct = async(req,res) =>{
    const pool = await getConecction()

  await pool.request()
   .input('id',sql.Int, req.params.id)
   .query('DELETE FROM articulo WHERE articulo_id =@id')
    console.log(req.params.id);
   res.redirect('/registrarStock')
}

export const updateProduct = async(req,res) =>{

   const pool = await getConecction();
   const result = await pool.request()  
   .input('id',sql.Int, req.params.id)
   .query('select * from categoria inner join articulo on categoria.categoria_id = articulo.categoria_id');
    const data=result.recordset;
   res.render('registrarStock/articulos_edit.ejs',{data:data})

}

export const editProduct = async(req,res)=>{
    const pool  =   await getConecction();
    const dataUnique = await pool.request()  
   .input('id',sql.Int, req.params.id)
   .query('select * from categoria inner join articulo on categoria.categoria_id = articulo.categoria_id');
    

    const error = validationResult(req);
    if (!error.isEmpty()) {
        const valores = req.body;
        const validaciones = error.array()
        return res.render('registrarStock/articulos_edit.ejs' , {data:dataUnique.recordset,validaciones:validaciones,valores:valores})
       
    }

    console.log("hola pasee");

    
    const result =  await pool.request()
    .input('id',sql.Int, req.params.id)
    .input('articulo',sql.VarChar,req.body.articulo)
    .input('cantidad',sql.SmallInt,req.body.cantidad)
    .input('precioCompra',sql.Money,req.body.precioCompra)
    .input('precioVenta',sql.Money,req.body.precioVenta)
    .query('UPDATE articulo SET articulo_nombre =@articulo, articulo_cantidad=@cantidad,articulo_precioCompra=@precioCompra,articulo_precioVenta=@precioVenta WHERE articulo_id=@id')

  
    res.redirect('/registrarStock')

}

export const search = async (req , res) =>{

    const pool = await getConecction();
    const artSearch = req.body.busqueda;
    const result = await pool.request().query('select * from categoria inner join articulo on categoria.categoria_id = articulo.categoria_id where articulo_nombre LIKE '+"'"+artSearch+"%'")
    res.render('registrarStock/articulos.ejs' , {data: result.recordset})
}


