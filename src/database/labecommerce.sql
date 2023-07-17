-- Active: 1689543265674@@127.0.0.1@3306

Active: 1689543265674 @ @ 127.0.0.1 @ 3306
CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

SELECT * from users;

SELECT * from products;

--Visualizando estruturas tabela ADD

PRAGMA table_info('users');

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u001',
        'Fulano Silva',
        'fulano@email.com',
        "fulano123",
        "2023-07-10-18:25:50"
    ), (
        'u002',
        'Maria Aparecida',
        'maria@email.com',
        "maria123",
        "2023-07-10-18:25:50"
    ), (
        'u003',
        'Fumiga Sauva',
        'fumiga@email.com',
        "fumiga123",
        "2023-07-10-18:25:50"
    ), (
        'u004',
        'Otta Fumiga',
        'otta@email.com',
        "otta123",
        "2023-07-10-18:25:50"
    ), (
        'u005',
        'Charles Henriquepédia',
        'charles@email.com',
        "charles123",
        "2023-07-10-18:25:50"
    ), (
        'u006',
        'Meia Duzia',
        'meia@email.com',
        "meia123",
        "2023-07-10-18:25:50"
    ), (
        'u007',
        'Sapo Cururu',
        'sapo@email.com',
        "sapo123",
        "2023-07-10-18:25:50"
    ), (
        'u008',
        'Tio Barnabé',
        'tio@email.com',
        "tio123",
        "2023-07-10-18:25:50"
    ), (
        'u009',
        'Visconde Sabuco',
        'visconde@email.com',
        "visconde123",
        "2023-07-10-18:25:50"
    ), (
        'u010',
        'Ciclano Lopes',
        'ciclano@email.com',
        "ciclano123",
        "2023-07-10-18:25:50"
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'p001',
        'Teclado',
        49.00,
        "Teclado custo beneficio excelente",
        "www.imagem.com/teclado"
    ), (
        'p002',
        'Mouse',
        30.00,
        "Mouse custo beneficio excelente",
        "www.imagem.com/mouse"
    ), (
        'p003',
        'Fone de ouvido',
        60.00,
        "Fone de ouvido custo beneficio excelente",
        "www.imagem.com/fone"
    ), (
        'p004',
        'Monitor',
        250.00,
        "Monitor custo beneficio excelente",
        "www.imagem.com/monitor"
    ), (
        'p005',
        'CPU',
        90.00,
        "CPU custo beneficio excelente",
        "www.imagem.com/CPU"
    ), (
        'p006',
        'HD',
        100.0,
        "HD custo beneficio excelente",
        "www.imagem.com/HD"
    ), (
        'p008',
        'Caixa de som',
        199.00,
        "Caixa de som custo beneficio excelente",
        "www.imagem.com/caixa"
    ), (
        'p009',
        'Modem',
        60.00,
        "Modem custo beneficio excelente",
        "www.imagem.com/modem"
    ), (
        'p010',
        'Fonte',
        300.00,
        "Fonte custo beneficio excelente",
        "www.imagem.com/fonte"
    );

-- Exercicios Aprofundamento em SQL

-- 1.A) Get All Users

SELECT * FROM users;

-- 1.B) Get All Products

SELECT * FROM products;

-- 1.C) Get Products Busca

SELECT * FROM products WHERE name LIKE '%a%';

-- 2.A) Create User

INSERT INTO
    users users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'Novo',
        'Usuario',
        'email@usuario',
        'usuario123',
        '2023-07-10 18:30:50'
    );

-- 2.B) Create Product

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'Novo',
        'Produto',
        100,
        'Produto novo',
        'www.foto.com/novo'
    );

-- 3.A) Delete User by id

DELETE FROM users WHERE id = 'ID AQUI';

-- 3.B) Delete Product by id

DELETE FROM products WHERE id = 'ID AQUI';

-- 3.C) Edit Porduct by id

UPDATE products
SET
    name = 'Novo nome do produto',
    price = 99,
    description = 'Nova descrição do produto',
    image_url = 'link-imagem/novo'
WHERE id = 'ID AQUI';







