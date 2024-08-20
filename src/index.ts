// import { Client } from "pg";



// client.connect();

// // async function createUserTable() {
// //     const result = await client.query(`CREATE TABLE Users(
// //         id SERIAL PRIMARY KEY,
// //     username VARCHAR(50) UNIQUE NOT NULL,
// //     email VARCHAR(255) UNIQUE NOT NULL,
// //     password VARCHAR(255) NOT NULL,
// //     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// //     )`);
// //     console.log(result);
// // }


// // createUserTable();



// async function insertData() {
//    try {

//     const res = await client.query("INSERT INTO users (USERNAME,EMAIL,PASSWORD) VALUES ('SHAIK IRFAN' ,'IRFANDBS507@GMAIL.COM','123456SEVEN');");
//    console.log("Data is inserted" , res);
    
//    } catch (error) {
//     console.log("Error while inserting the data into users tables", error)
    
//    }finally{
//     await client.end();
//    }
    
// }

// insertData();


import { Client } from 'pg';

// Async function to fetch user data from the database given an email
async function getUser(email: string) {
    

        const client = new Client({
            connectionString:
                "postgresql://postgres:irfu@localhost:5432/postgres?sslmode=disable",
        });
       
    
    

  try {
    await client.connect(); // Ensure client connection is established
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await client.query(query, values);
    
    if (result.rows.length > 0) {
      console.log('User found:', result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log('No user found with the given email.');
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error('Error during fetching user:', err);
    throw err; // Rethrow or handle error appropriately
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
getUser('user3@example.com').catch(console.error);