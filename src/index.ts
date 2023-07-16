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
  res.status(202).send(users);
});

// app.get("/products", (req: Request, res: Response) => {
//   res.status(203).send(products);
// });

app.get("/products", (req: Request, res: Response) => {
  const productToFind = req.query.name as string;

  if (productToFind) {
    const result: Tproduct[] = products.filter((product) =>
      product.name.toLowerCase().includes(productToFind.toLowerCase())
    );
    res.status(204).send(result);
  } else {
    res.send(products);
  }
});

app.post("/users", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const email = req.body.age as string;
  const password = req.body.size as string;
  const createdAt = new Date().toISOString() as string;
  const newUser: Tuser = {
    id,
    name,
    email,
    password,
    createdAt,
  };
  users.push(newUser);
  res.status(201).send("Usuario cadastrado com sucesso");
});

app.post("/products", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const price = req.body.price as number;
  const description = req.body.description as string;
  const imageUrl = req.body.imageUrl as string;
  const newProduct: Tproduct = {
    id,
    name,
    price,
    description,
    imageUrl,
  };
  products.push(newProduct);
  res.status(202).send("Produto cadastrado com sucesso");
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const userIdToDelete = req.params.id;
  const userIndex = users.findIndex((user) => user.id === userIdToDelete);

  if (userIndex >= 0) {
    users.splice(userIndex, 1);
  }
  res.status(200).send("Usuario deletado com sucesso");
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const productIdToDelete = req.params.id;
  const productIndex = products.findIndex((product) => product.id === productIdToDelete);

  if (productIndex >= 0) {
    products.splice(productIndex, 1);
  }
  res.status(200).send("Produto deletado com sucesso");
});

app.put('/products/:id', (req: Request, res: Response) => {
  const productIdToEdit = req.params.id
  const newId = req.body.id as string | undefined         
	const newName = req.body.name as string | undefined    
	const newPrice = req.body.price as number | undefined      
	const newDescription = req.body.description as string | undefined  
  const newImageUrl = req.body.imageUrl as string | undefined
  const product = products.find((product) => product.id === productIdToEdit)

  if (product) {
      product.id = newId || product.id
      product.name = newName || product.name
      product.price = newPrice || product.price
      product.description = newDescription || product.description
      product.imageUrl = newImageUrl || product.imageUrl
  }
  res.status(200).send("Produto atualizado com sucesso")
})
