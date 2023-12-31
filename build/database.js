"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.users = exports.searchProductsByName = exports.createProduct = exports.getAllProducts = exports.createUser = exports.getAllUsers = void 0;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
const createUser = (id, name, email, pass) => {
    let newUser = {
        id: id,
        name: name,
        email: email,
        password: pass,
        createdAt: new Date().toISOString(),
    };
    exports.users.push(newUser);
    console.log("Cadastro realizado com sucesso");
};
exports.createUser = createUser;
// Funções Produtos
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const createProduct = (id, name, price, description) => {
    let newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        image_url: "Colocar a url da imagem depois",
    };
    exports.products.push(newProduct);
    console.log("Produto cadastrado");
};
exports.createProduct = createProduct;
const searchProductsByName = (name) => {
    return exports.products.find((product) => product.name.includes(name));
};
exports.searchProductsByName = searchProductsByName;
// Arrays usuarios e produtos
exports.users = [
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
exports.products = [
    {
        id: "p001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        image_url: "https://picsum.photos/seed/Mouse%20gamer/400",
    },
    {
        id: "p002",
        name: "Teclado Wireless",
        price: 900,
        description: "Monitor LED full 24 polegadas",
        image_url: "https://picsum.photos/seed/Monitor/400",
    },
    {
        id: "p003",
        name: "Placa Mãe",
        price: 900,
        description: "Placa mãe",
        image_url: "https://picsum.photos/seed/Monitor/400",
    }
];
