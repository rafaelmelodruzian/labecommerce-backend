import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//BLOCO GETS
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users")
    res.status(200).send(result)
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
app.get("/products", async (req: Request, res: Response) => {
  const productToFind = req.query.name as string;
  try {
    if (!productToFind) {
      const allProducts = await db("products");
      res.status(200).send(allProducts);
    } else {
      const result = await db("products")
        .select()
        .where("name", "like", `${productToFind}`)
      res.status(200).send(result);
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
app.get("/purchases/:id?", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let purchasesQuery = db
      .select(
        'purchases.id',
        { buyer: 'users.name' },
        { product_id: 'products.id' },
        { product_name: 'products.name' },
        { quantity: 'purchases_products.quantity' }
      )
      .sum({ total: db.raw('products.price * purchases_products.quantity') })
      .from('purchases')
      .innerJoin('users', 'purchases.buyer', 'users.id')
      .innerJoin('purchases_products', 'purchases.id', 'purchases_products.purchase_id')
      .innerJoin('products', 'products.id', 'purchases_products.product_id')
      .groupBy('purchases.id', 'users.name', 'products.id', 'products.name', 'purchases_products.quantity')

    if (id) {
      purchasesQuery.where('purchases.id', id);
    }

    const result = await purchasesQuery;

    if (result.length === 0) {
      return res.status(404).send("Nenhum registro encontrado.");
    }

    const purchases: any = {};
    result.forEach((row: any) => {
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
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// BLOCO DELETES
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const userIdToDelete = req.params.id;
    const userToDelete = await db
      .select('name')
      .from('users')
      .where('id', userIdToDelete)
      .first();
    if (userToDelete) {
      await db
        .del()
        .from('users')
        .where('id', userIdToDelete);

      res.status(200).send("Usuário deletado com sucesso.");
    } else {
      res.status(404).send("Usuário não encontrado.");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Erro ao deletar usuário");
  }
});
app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const productIdToDelete = req.params.id;
    const productToDelete = await db
      .select('name')
      .from('products')
      .where('id', productIdToDelete)
      .first();
    if (productToDelete) {
      await db
        .del()
        .from('products')
        .where('id', productIdToDelete);

      res.status(200).send("Produto deletado com sucesso.");
    } else {
      res.status(404).send("Produto não encontrado.");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Erro ao deletar produto");
  }
});
app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchaseIdToDelete = req.params.id;
    const purchaseToDelete = await db
      .select('*')
      .from('purchases')
      .where('id', purchaseIdToDelete)
      .first();
    if (purchaseToDelete) {
      await db
        .from('purchases')
        .where('id', purchaseIdToDelete)
        .del();
      res.status(200).send("Compra deletada com sucesso");
    } else {
      res.status(404).send("Compra não encontrada");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Erro ao deletar compra");
  }
});

// BLOCO POSTS
app.post("/users", async (req: Request, res: Response) => {
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
    const idVerify = await db("users").where("id", id).first();
    if (idVerify) {
      throw new Error("Já existe uma conta com esse ID");
    }
    const emailVerify = await db("users").where("email", email).first();
    if (emailVerify) {
      throw new Error("Já existe uma conta com esse e-mail");
    }

    const newUser = {
      id: id,
      name: name,
      email: email,
      password: password,
      created_at: `${new Date().toISOString()}`
    }
    await db("users").insert(newUser)
    res.status(201).send("Usuário cadastrado com sucesso");

  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.message);
  }
});
app.post("/products", async (req: Request, res: Response) => {
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
      console.log(typeof image_url)
      throw new Error("'image_url' deve ser uma string");
    }
    const productIdVerify = await db("products").where("id", id).first();
    if (productIdVerify) {
      throw new Error("Já existe um produto com esse ID")
    };

    const newProduct = {
      id: id,
      name: name,
      price: price,
      description: description,
      image_url: image_url
    }

    await db("products").insert(newProduct)
    res.status(201).send("Produto cadastrado com sucesso");

  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.message);
  }
});
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    interface Product {
      id: number;
      quantity: number;
    }
    const { id, buyer, products } = req.body;

    let totalPrice = 0;

    for (const product of products) {
      const productId = product.id;
      const productQuantity = product.quantity;

      const result = await db
        .select('price')
        .from('products')
        .where('id', productId)

      if (result[0]?.length > 0) {
        const productPrice = Number(result[0][0].price);
        totalPrice += productPrice * productQuantity;
      }
    }

    await db('purchases').insert({
      id,
      buyer,
      total_price: totalPrice,
      created_at: new Date().toISOString()
    });

    const purchaseProducts: Product[] = products.map((product: Product) => ({
      purchase_id: id,
      product_id: product.id,
      quantity: product.quantity
    }));

    await db('purchases_products').insert(purchaseProducts);

    res.status(201).send("Pedido realizado com sucesso");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// BLOCO PUTS
app.put("/products/:id", async (req: Request, res: Response) => {
  const productIdToEdit = req.params.id;
  const { id, name, price, description, image_url } = req.body
  try {
    const product = await db("products").where("id", productIdToEdit).first();
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

    await db("products").where("id", productIdToEdit).update(updatedProduct);
    res.status(200).send("Produto atualizado com sucesso");

  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
app.put("/users/:id", async (req: Request, res: Response) => {
  const userIdToEdit = req.params.id;
  const { id, name, email, password } = req.body
  try {
    const user = await db("users").where("id", userIdToEdit).first();
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

    await db("users").where("id", userIdToEdit).update(updatedUser);
    res.status(200).send("Cadastro do usuario atualizado com sucesso");

  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
})