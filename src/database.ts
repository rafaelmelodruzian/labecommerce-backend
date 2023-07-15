import { Tproduct, Tuser } from "./types";

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
    name: "Mouse",
    price: 250,
    description: "Melhor mouse do mercado!",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
  },
  {
    id: "p002",
    name: "Monitor",
    price: 900,
    description: "Monitor LED full 24 polegadas",
    imageUrl: "https://picsum.photos/seed/Monitor/400",
  },
];

