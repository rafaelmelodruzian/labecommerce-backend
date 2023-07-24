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
        const result = yield (0, knex_1.db)("users");
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
            const allProducts = yield (0, knex_1.db)("products");
            res.status(200).send(allProducts);
        }
        else {
            const result = yield (0, knex_1.db)("products")
                .select()
                .where("name", "like", `${productToFind}`);
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
        let purchasesQuery = knex_1.db
            .select('purchases.id', { buyer: 'users.name' }, { product_id: 'products.id' }, { product_name: 'products.name' }, { quantity: 'purchases_products.quantity' })
            .sum({ total: knex_1.db.raw('products.price * purchases_products.quantity') })
            .from('purchases')
            .innerJoin('users', 'purchases.buyer', 'users.id')
            .innerJoin('purchases_products', 'purchases.id', 'purchases_products.purchase_id')
            .innerJoin('products', 'products.id', 'purchases_products.product_id')
            .groupBy('purchases.id', 'users.name', 'products.id', 'products.name', 'purchases_products.quantity');
        if (id) {
            purchasesQuery.where('purchases.id', id);
        }
        const result = yield purchasesQuery;
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
// BLOCO DELETES
app.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIdToDelete = req.params.id;
        const userToDelete = yield knex_1.db
            .select('name')
            .from('users')
            .where('id', userIdToDelete)
            .first();
        if (userToDelete) {
            yield knex_1.db
                .del()
                .from('users')
                .where('id', userIdToDelete);
            res.status(200).send("Usuário deletado com sucesso.");
        }
        else {
            res.status(404).send("Usuário não encontrado.");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao deletar usuário");
    }
}));
app.delete("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productIdToDelete = req.params.id;
        const productToDelete = yield knex_1.db
            .select('name')
            .from('products')
            .where('id', productIdToDelete)
            .first();
        if (productToDelete) {
            yield knex_1.db
                .del()
                .from('products')
                .where('id', productIdToDelete);
            res.status(200).send("Produto deletado com sucesso.");
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
    try {
        const purchaseIdToDelete = req.params.id;
        const purchaseToDelete = yield knex_1.db
            .select('*')
            .from('purchases')
            .where('id', purchaseIdToDelete)
            .first();
        if (purchaseToDelete) {
            yield knex_1.db
                .from('purchases')
                .where('id', purchaseIdToDelete)
                .del();
            res.status(200).send("Compra deletada com sucesso");
        }
        else {
            res.status(404).send("Compra não encontrada");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao deletar compra");
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
        const newUser = {
            id: id,
            name: name,
            email: email,
            password: password,
            created_at: `${new Date().toISOString()}`
        };
        yield (0, knex_1.db)("users").insert(newUser);
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
        ;
        const newProduct = {
            id: id,
            name: name,
            price: price,
            description: description,
            image_url: image_url
        };
        yield (0, knex_1.db)("products").insert(newProduct);
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
            const result = yield knex_1.db
                .select('price')
                .from('products')
                .where('id', productId);
            if (((_a = result[0]) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                const productPrice = Number(result[0][0].price);
                totalPrice += productPrice * productQuantity;
            }
        }
        yield (0, knex_1.db)('purchases').insert({
            id,
            buyer,
            total_price: totalPrice,
            created_at: new Date().toISOString()
        });
        const purchaseProducts = products.map((product) => ({
            purchase_id: id,
            product_id: product.id,
            quantity: product.quantity
        }));
        yield (0, knex_1.db)('purchases_products').insert(purchaseProducts);
        res.status(201).send("Pedido realizado com sucesso");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
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
app.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdToEdit = req.params.id;
    const { id, name, email, password } = req.body;
    try {
        const user = yield (0, knex_1.db)("users").where("id", userIdToEdit).first();
        if (!user) {
            res.status(404).send("Usuario não encontrado");
            return;
        }
        const updatedUser = {
            id: id || user.id,
            name: name || user.name,
            email: email || user.email,
            password: password || user.description,
            created_at: new Date().toISOString()
        };
        yield (0, knex_1.db)("users").where("id", userIdToEdit).update(updatedUser);
        res.status(200).send("Cadastro do usuario atualizado com sucesso");
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}));
