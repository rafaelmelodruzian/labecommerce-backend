import express, { Request, Response } from "express";
import cors from "cors";
import {
  users,
  products,
  getAllUsers,
  createUser,
  createProduct,
  getAllProducts,
  searchProductsByName,
} from "./database";
import { Tproduct } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.status(201).send("Pong!!");
});

app.get("/users", (req: Request, res: Response) => {
  res.status(202).send(users);
});

app.get("/products", (req: Request, res: Response) => {
  res.status(203).send(products);
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
