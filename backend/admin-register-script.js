console.clear();
console.log("\n\n", "~~~~   =====  Script Started  =====   ~~~~", "\n");

import { Client } from 'pg'
import argon from "argon2";
import jwt from "jsonwebtoken";

const client = new Client({
    user: "postgres",
    password: "database123",
    host: "localhost",
    port: 5432,
    database: "mdcatemy",
}); 
try {
    await client.connect();
} catch (err) {
    console.error("Error: Client couldn't connect.");
    process.exit(-1);
}

const user = {
    name: "Admin",
    email: "admin@test.com",
    age: 20,
    gender: "M",
    role: "ADMIN",
    password: "test1234"
};
try {
    user.password = await argon.hash(user.password, {
        hashLength: 32,
        type: argon.argon2id,
        secret: Buffer.from("srj&N^U_F[,1Qf.z(zx_v^es)V4#sVe1oLbJe(;enPxRkdXydy")
    });
} catch (err) {
    console.error("Error: Password couldn't be hashed properly.");
    process.exit(-2);
}

try {
    await client.query("INSERT INTO users (name, email, password, gender, role) VALUES ($1, $2, $3, $4, $5)", [user.name, user.email, user.password, user.gender, user.role]);
} catch (err) {
    console.error("Error: Couldn't insert in the database.");
    process.exit(-3);
}

console.log({
    status: "success",
    message: "Signed Up Successfully! Welcome Home!",
    token: jwt.sign({ email: user.email, role: user.role }, "[i)CyE$+2-WICwgOIU.g-bs/zqj3Q6wt(B)cE9zylZuyfjil9b", { expiresIn: "7 days" })
});

try {
    await client.end();
} catch (err) {
    console.warn("Warning: Couldn't end the client connection.");
    process.exit(-4);
}

console.log("\n", "~~~~   =====  Script Ended  =====   ~~~~", "\n");