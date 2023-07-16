"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/marco", (req, res) => {
    res.status(201).send("polo");
});
app.get("/users", (req, res) => {
    try {
        res.status(202).send(database_1.users);
    }
    catch (error) {
        alert(error);
        res.status(202);
        res.send(error.message);
    }
});
app.get("/products", (req, res) => {
    res.status(203).send(database_1.products);
});
// Fazer exercicio 1B - Fluxo de dados no backend
// app.get("/products", (req: Request, res: Response) => {
//   const productToFind = req.query.name as string;
//   const productToFind = req.params.name as string;
//   if (productToFind) {
//     const result: Tproduct[] = products.filter((product) =>
//       product.name.toLowerCase().includes(productToFind.toLowerCase())
//     );
//     res.status(204).send(result);
//   } else {
//     res.send(products);
//   }
// });
app.post("/users", (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const createdAt = new Date().toISOString();
        if (typeof id !== "string") {
            throw new Error("'id' deve ser uma string");
        }
        if (typeof name !== "string") {
            throw new Error("'name' deve ser uma string");
        }
        if (typeof email !== "string") {
            throw new Error("'email' deve ser uma string");
        }
        if (typeof password !== "string") {
            throw new Error("'password' deve ser uma string");
        }
        const userIdVerify = database_1.users.find(user => user.id === id);
        if (userIdVerify) {
            throw new Error("Já existe uma conta com esse ID");
        }
        const userEmailVerify = database_1.users.find(user => user.email === email);
        if (userEmailVerify) {
            throw new Error("Já existe uma conta com esse e-mail");
        }
        const newUser = {
            id,
            name,
            email,
            password,
            createdAt,
        };
        database_1.users.push(newUser);
        res.status(201).send("Usuario cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.post("/products", (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const imageUrl = req.body.imageUrl;
        if (typeof id !== "string") {
            throw new Error("'id' deve ser uma string");
        }
        if (typeof name !== "string") {
            throw new Error("'name' deve ser uma string");
        }
        if (typeof price !== "number") {
            throw new Error("'email' deve ser uma number");
        }
        if (typeof description !== "string") {
            throw new Error("'description' deve ser uma string");
        }
        if (typeof imageUrl !== "string") {
            throw new Error("'imageUrl' deve ser uma string");
        }
        const productIdVerify = database_1.products.find(product => product.id === id);
        if (productIdVerify) {
            throw new Error("Já existe um produto com esse ID");
        }
        const newProduct = {
            id,
            name,
            price,
            description,
            imageUrl,
        };
        database_1.products.push(newProduct);
        res.status(202).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.delete("/users/:id", (req, res) => {
    const userIdToDelete = req.params.id;
    const userIndex = database_1.users.findIndex((user) => user.id === userIdToDelete);
    if (userIndex >= 0) {
        database_1.users.splice(userIndex, 1);
        res.status(200).send("Usuário deletado com sucesso");
    }
    else {
        res.status(404).send("Usuário não encontrado");
    }
});
app.delete("/products/:id", (req, res) => {
    const productIdToDelete = req.params.id;
    const productIndex = database_1.products.findIndex((product) => product.id === productIdToDelete);
    if (productIndex >= 0) {
        database_1.products.splice(productIndex, 1);
        res.status(200).send("Produto deletado com sucesso");
    }
    else {
        res.status(404).send("Produto não encontrado");
    }
});
app.put("/products/:id", (req, res) => {
    const productIdToEdit = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImageUrl = req.body.imageUrl;
    const productIndex = database_1.products.findIndex((product) => product.id === productIdToEdit);
    if (productIndex >= 0) {
        const product = database_1.products[productIndex];
        product.id = newId || product.id;
        product.name = newName || product.name;
        product.price = newPrice || product.price;
        product.description = newDescription || product.description;
        product.imageUrl = newImageUrl || product.imageUrl;
        res.status(200).send("Produto atualizado com sucesso");
    }
    else {
        res.status(404).send("Produto não encontrado");
    }
});
