import sql from 'mssql';
import {DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE} from '../config.js'


const dbSettings = {
    
    user:DB_USER || "sa",
    password:DB_PASSWORD || "lucas1248759",
    server:DB_HOST || "localhost",
    database:DB_DATABASE || "sistemaKiosko",
    options:{
        encrypt:true,
        trustServerCertificate:true
    },
    port:1433

}

export async function getConecction(){
    
  try {
    const pool = await sql.connect(dbSettings);
    return pool
  } catch (err) {
    console.log(err);
  }
}


