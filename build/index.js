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
app.get("/ping", (req, res) => {
    res.status(201).send("Pong!!");
});
app.get("/users", (req, res) => {
    res.status(202).send(database_1.users);
});
app.get("/products", (req, res) => {
    res.status(203).send(database_1.products);
});
// app.get("/products", (req: Request, res: Response) => {
//   const productToFind = req.query.name as string;
//   if (productToFind) {
//     const result: Tproduct[] = products.filter((product) =>
//       product.name.toLowerCase().includes(productToFind.toLowerCase())
//     );
//     res.status(204).send("AA");
//   } else {
//     res.status(205).send("BB");
//   }
// });
// console.log(users);
// console.log(products);
// console.log(getAllUsers());
// createUser("abc", "rafa", "rafa@email.com", "rafa123" ));
// console.log(getAllProducts())
// createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.")
// searchProductsByName("gamer")
// console.log(searchProductsByName("gamer"))
