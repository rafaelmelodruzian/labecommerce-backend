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
import { Tproduct, Tuser } from "./types";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/marco", (req: Request, res: Response) => {
  res.status(201).send("polo");
});

app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(202).send(users);
  } catch (error: any) {
    alert(error);
    res.status(202);
    res.send(error.message);
  }
});

app.get("/products", (req: Request, res: Response) => {
  res.status(203).send(products);
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

app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;
    const createdAt = new Date().toISOString() as string;

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
    const userIdVerify = users.find(user => user.id === id);
    if (userIdVerify) {
      throw new Error("Já existe uma conta com esse ID");
    }
    const userEmailVerify = users.find(user => user.email === email);
    if (userEmailVerify) {
      throw new Error("Já existe uma conta com esse e-mail");
    }

    const newUser: Tuser = {
      id,
      name,
      email,
      password,
      createdAt,
    };
    users.push(newUser);
    res.status(201).send("Usuario cadastrado com sucesso");

  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

app.post("/products", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const imageUrl = req.body.imageUrl as string;

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
    const productIdVerify = products.find(product => product.id === id);
    if (productIdVerify) {
      throw new Error("Já existe um produto com esse ID");
    }

    const newProduct: Tproduct = {
      id,
      name,
      price,
      description,
      imageUrl,
    };
    products.push(newProduct);
    res.status(202).send("Produto cadastrado com sucesso");

  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const userIdToDelete = req.params.id;
  const userIndex = users.findIndex((user) => user.id === userIdToDelete);

  if (userIndex >= 0) {
    users.splice(userIndex, 1);
    res.status(200).send("Usuário deletado com sucesso");
  } else {
    res.status(404).send("Usuário não encontrado");
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const productIdToDelete = req.params.id;
  const productIndex = products.findIndex((product) => product.id === productIdToDelete);

  if (productIndex >= 0) {
    products.splice(productIndex, 1);
    res.status(200).send("Produto deletado com sucesso");
  } else {
    res.status(404).send("Produto não encontrado");
  }
});

app.put("/products/:id", (req: Request, res: Response) => {
  const productIdToEdit = req.params.id;
  const newId = req.body.id as string | undefined;
  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newDescription = req.body.description as string | undefined;
  const newImageUrl = req.body.imageUrl as string | undefined;
  const productIndex = products.findIndex((product) => product.id === productIdToEdit);

  if (productIndex >= 0) {
    const product = products[productIndex];
    product.id = newId || product.id;
    product.name = newName || product.name;
    product.price = newPrice || product.price;
    product.description = newDescription || product.description;
    product.imageUrl = newImageUrl || product.imageUrl;
    res.status(200).send("Produto atualizado com sucesso");
  } else {
    res.status(404).send("Produto não encontrado");
  }
});

