import sql from 'mssql';

const dbSettings = {
    
    user:'sa',
    password:'lucas1248759',
    server:'localhost',
    database:'sistemaKiosko',
    options:{
        encrypt:true,
        trustServerCertificate:true
    }

}

export async function getConecction(){
    
  try {
    const pool = await sql.connect(dbSettings);
    return pool
  } catch (err) {
    console.log(err);
  }
}


