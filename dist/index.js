"use strict";
// import { Client } from "pg";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const pg_1 = require("pg");
// Async function to fetch user data from the database given an email
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: "postgresql://postgres:irfu@localhost:5432/postgres?sslmode=disable",
        });
        try {
            yield client.connect(); // Ensure client connection is established
            const query = 'SELECT * FROM users WHERE email = $1';
            const values = [email];
            const result = yield client.query(query, values);
            if (result.rows.length > 0) {
                console.log('User found:', result.rows[0]); // Output user data
                return result.rows[0]; // Return the user data
            }
            else {
                console.log('No user found with the given email.');
                return null; // Return null if no user was found
            }
        }
        catch (err) {
            console.error('Error during fetching user:', err);
            throw err; // Rethrow or handle error appropriately
        }
        finally {
            yield client.end(); // Close the client connection
        }
    });
}
// Example usage
getUser('user3@example.com').catch(console.error);
