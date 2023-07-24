-- Active: 1689543265674@@127.0.0.1@3306

--users
CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
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

-- procucts
CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
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
    ),
    (
        'p007',
        'Memoria RAM',
        400.0,
        "M.R. custo beneficio excelente",
        "www.imagem.com/RAM"
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

--pruchases
CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
    );
INSERT INTO
    purchases (
        id,
        buyer,
        total_price,
        created_at
    )
VALUES (
        'pur001',
        'u010',
        1000,
        '2023-07-14 20:20:20'
    ), (
        'pur002',
        'u008',
        500,
        '2023-07-15 20:20:30'
    ), (
        'pur003',
        'u007',
        750,
        '2023-07-16 20:20:40'
    ), (
        'pur004',
        'u004',
        200,
        '2023-07-17 20:20:50'
    ), (
        'pur005',
        'u003',
        860,
        '2023-07-18 20:20:10'
    );



-- purchases_products
CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) 
        REFERENCES purchases(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE 
        FOREIGN KEY (product_id) REFERENCES products(id)
        ON UPDATE CASCADE 
        ON DELETE CASCADE
    );   
INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES
 ('pur001', 'p005', 2),
  ('pur002', 'p008', 2),
   ('pur003', 'p005', 2),
    ('pur004', 'p001', 2),
     ('pur005', 'p002', 2);
;
