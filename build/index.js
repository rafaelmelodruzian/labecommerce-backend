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
    res.status(202).send(database_1.users);
});
// app.get("/products", (req: Request, res: Response) => {
//   res.status(203).send(products);
// });
app.get("/products", (req, res) => {
    const productToFind = req.query.name;
    if (productToFind) {
        const result = database_1.products.filter((product) => product.name.toLowerCase().includes(productToFind.toLowerCase()));
        res.status(204).send(result);
    }
    else {
        res.send(database_1.products);
    }
});
app.post("/users", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.age;
    const password = req.body.size;
    const createdAt = new Date().toISOString();
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt,
    };
    database_1.users.push(newUser);
    res.status(201).send("Usuario cadastrado com sucesso");
});
app.post("/products", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl,
    };
    database_1.products.push(newProduct);
    res.status(202).send("Produto cadastrado com sucesso");
});
app.delete("/users/:id", (req, res) => {
    const userIdToDelete = req.params.id;
    const userIndex = database_1.users.findIndex((user) => user.id === userIdToDelete);
    if (userIndex >= 0) {
        database_1.users.splice(userIndex, 1);
    }
    res.status(200).send("Usuario deletado com sucesso");
});
app.delete("/products/:id", (req, res) => {
    const productIdToDelete = req.params.id;
    const productIndex = database_1.products.findIndex((product) => product.id === productIdToDelete);
    if (productIndex >= 0) {
        database_1.products.splice(productIndex, 1);
    }
    res.status(200).send("Produto deletado com sucesso");
});
app.put('/products/:id', (req, res) => {
    const productIdToEdit = req.params.id;
    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImageUrl = req.body.imageUrl;
    const product = database_1.products.find((product) => product.id === productIdToEdit);
    if (product) {
        product.id = newId || product.id;
        product.name = newName || product.name;
        product.price = newPrice || product.price;
        product.description = newDescription || product.description;
        product.imageUrl = newImageUrl || product.imageUrl;
    }
    res.status(200).send("Produto atualizado com sucesso");
});
