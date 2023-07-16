import { Tproduct, Tuser } from "./types";

// Funções Usuarios
export const getAllUsers = () => {
  return users;
};
export const createUser = (
  id: string,
  name: string,
  email: string,
  pass: string
): void => {
  let newUser = {
    id: id,
    name: name,
    email: email,
    password: pass,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  console.log("Cadastro realizado com sucesso");
};

// Funções Produtos
export const getAllProducts = () => {
  return products;
};
export const createProduct = (
  id: string,
  name: string,
  price: number,
  description: string
): void => {
  let newProduct = {
    id: id,
    name: name,
    price: price,
    description: description,
    imageUrl: "Colocar a url da imagem depois",
  };
  products.push(newProduct);
  console.log("Produto cadastrado");
};
export const searchProductsByName = (name: string): Tproduct | undefined => {
  return products.find((product) => product.name.includes(name));
};

// Arrays usuarios e produtos
export const users: Tuser[] = [
  {
    id: "u001",
    name: "Fulano",
    email: "fulano@email.com",
    password: "fulano123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u002",
    name: "Beltrana",
    email: "beltrana@email.com",
    password: "beltrana123",
    createdAt: new Date().toISOString(),
  },
];

export const products: Tproduct[] = [
  {
    id: "p001",
    name: "Mouse gamer",
    price: 250,
    description: "Melhor mouse do mercado!",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
  },
  {
    id: "p002",
    name: "Teclado Wireless",
    price: 900,
    description: "Monitor LED full 24 polegadas",
    imageUrl: "https://picsum.photos/seed/Monitor/400",
  },
];
