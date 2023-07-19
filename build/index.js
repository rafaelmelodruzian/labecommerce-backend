"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
//BLOCO GETS
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw(`
    SELECT * FROM users;
  `);
        res.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}));
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productToFind = req.query.name;
    try {
        if (!productToFind) {
            const allProducts = yield knex_1.db.raw(`SELECT * FROM products`);
            res.status(200).send(allProducts);
        }
        else {
            const result = yield knex_1.db.raw(`
        SELECT * FROM products WHERE name LIKE '%${productToFind}%';
      `);
            res.status(200).send(result);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}));
app.get("/purchases/:id?", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let purchasesQuery = `
      SELECT purchases.id, users.name AS buyer, products.id AS product_id,
        products.name AS product_name, purchases_products.quantity,
        products.price * purchases_products.quantity AS total
      FROM purchases
      JOIN users ON purchases.buyer = users.id
      JOIN purchases_products ON purchases.id = purchases_products.purchase_id
      JOIN products ON products.id = purchases_products.product_id
    `;
        if (id) {
            purchasesQuery += ` WHERE purchases.id = '${id}'`;
        }
        const result = yield knex_1.db.raw(purchasesQuery);
        if (result.length === 0) {
            return res.status(404).send("Nenhum registro encontrado.");
        }
        const purchases = {};
        result.forEach((row) => {
            const { id, buyer, product_id, product_name, quantity, total } = row;
            if (!purchases[id]) {
                purchases[id] = {
                    id,
                    buyer,
                    products: [],
                    total: 0
                };
            }
            purchases[id].products.push({
                id: product_id,
                name: product_name,
                quantity
            });
            purchases[id].total += total;
        });
        const response = Object.values(purchases);
        res.status(200).send(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}));
// BLOCO POSTS
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, password, created_at } = req.body;
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
        const idVerify = yield (0, knex_1.db)("users").where("id", id).first();
        if (idVerify) {
            throw new Error("Já existe uma conta com esse ID");
        }
        const emailVerify = yield (0, knex_1.db)("users").where("email", email).first();
        if (emailVerify) {
            throw new Error("Já existe uma conta com esse e-mail");
        }
        const queryUsers = `
    INSERT INTO users (id, name, email, password, created_at)
    VALUES ('${id}', '${name}', '${email}', '${password}', '${new Date().toISOString()}')  `;
        yield knex_1.db.raw(queryUsers);
        res.status(201).send("Usuário cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}));
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, price, description, image_url } = req.body;
        if (typeof id !== "string") {
            throw new Error("'id' deve ser uma string");
        }
        if (typeof name !== "string") {
            throw new Error("'name' deve ser uma string");
        }
        if (typeof price !== "number") {
            throw new Error("'price' deve ser uma number");
        }
        if (typeof description !== "string") {
            throw new Error("'description' deve ser uma string");
        }
        if (typeof image_url !== "string") {
            console.log(typeof image_url);
            throw new Error("'image_url' deve ser uma string");
        }
        const productIdVerify = yield (0, knex_1.db)("products").where("id", id).first();
        if (productIdVerify) {
            throw new Error("Já existe um produto com esse ID");
        }
        const queryProducts = `
    INSERT INTO products (id, name, price, description, image_url)
    VALUES ('${id}', '${name}', '${price}', '${description}', '${image_url}')
  `;
        yield knex_1.db.raw(queryProducts);
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}));
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id, buyer, products } = req.body;
        let totalPrice = 0;
        for (const product of products) {
            const productId = product.id;
            const productQuantity = product.quantity;
            const productPriceQuery = `
        SELECT price FROM products WHERE id = '${productId}';
      `;
            const result = yield knex_1.db.raw(productPriceQuery);
            if (((_a = result[0]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                const productPrice = Number(result[0][0].price);
                totalPrice += productPrice * productQuantity;
            }
        }
        const purchaseInsert = `
      INSERT INTO purchases (id, buyer, total_price, created_at) 
      VALUES ('${id}', '${buyer}', ${totalPrice}, '${new Date().toISOString()}');
    `;
        yield knex_1.db.raw(purchaseInsert);
        for (const product of products) {
            const { id: productId, quantity: productQuantity } = product;
            const pur_proInsert = `
        INSERT INTO purchases_products (purchase_id, product_id, quantity) 
        VALUES ('${id}', '${productId}', ${productQuantity});
      `;
            yield knex_1.db.raw(pur_proInsert);
        }
        res.status(201).send("Pedido realizado com sucesso");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// BLOCO DELETES
app.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdToDelete = req.params.id;
    try {
        const resultUsers = yield knex_1.db.raw(`
      SELECT name FROM users WHERE id = '${userIdToDelete}';
    `);
        if (resultUsers.length > 0) {
            yield knex_1.db.raw(`
        DELETE FROM users WHERE id = '${userIdToDelete}';
      `);
            res.status(200).send("Usuário deletado com sucesso.");
        }
        else {
            res.status(404).send("Usuario não encontrado.");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao deletar usuário");
    }
}));
app.delete("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productIdToDelete = req.params.id;
    try {
        const resultProducts = yield knex_1.db.raw(`
      SELECT name FROM products WHERE id = '${productIdToDelete}';
    `);
        if (resultProducts.length > 0) {
            yield knex_1.db.raw(`
        DELETE FROM products WHERE id = '${productIdToDelete}';
      `);
            res.status(200).send("Produto deletado com sucesso");
        }
        else {
            res.status(404).send("Produto não encontrado.");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao deletar produto");
    }
}));
app.delete("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const purchaseIdToDelete = req.params.id;
    try {
        const resultpurchases = yield knex_1.db.raw(`
      SELECT * FROM purchases WHERE id = '${purchaseIdToDelete}';
    `);
        console.log(resultpurchases);
        if (resultpurchases.length > 0) {
            yield knex_1.db.raw(`
        DELETE FROM purchases WHERE id = '${purchaseIdToDelete}';
      `);
            res.status(200).send("Compra deletado com sucesso");
        }
        else {
            res.status(404).send("Compra não encontrado");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao deletar compra");
    }
}));
// BLOCO PUTS
app.put("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productIdToEdit = req.params.id;
    const { id, name, price, description, image_url } = req.body;
    try {
        const product = yield (0, knex_1.db)("products").where("id", productIdToEdit).first();
        if (!product) {
            res.status(404).send("Produto não encontrado");
            return;
        }
        const updatedProduct = {
            id: id || product.id,
            name: name || product.name,
            price: price || product.price,
            description: description || product.description,
            image_url: image_url || product.image_url,
        };
        yield (0, knex_1.db)("products").where("id", productIdToEdit).update(updatedProduct);
        res.status(200).send("Produto atualizado com sucesso");
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}));
