import sql from 'mssql';
import {DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE} from '../config.js'


const dbSettings = {
    
    user:DB_USER,
    password:DB_PASSWORD,
    server:DB_HOST,
    database:DB_DATABASE,
    options:{
        encrypt:false,
        trustServerCertificate:true
    },
    port: 1433

}

export async function getConecction(){
    
  try {
    const pool = await sql.connect(dbSettings);
    return pool
  } catch (err) {
    console.log(err);
  }
}


