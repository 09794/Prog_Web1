const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log('running...');
});

let db = [
    {
        id: 1,
        titulo: "Beastars Vol 1",
        autor: "Paru Itagi",
        editora: "Panini",
        ano: 2016,
        quant: 12,
        preco: 34.9
    },
    {
        id: 2,
        titulo: "Os Bruzundangas",
        autor: "Lima Barreto",
        editora: "Principis",
        ano: 1923,
        quant: 8,
        preco: 10.3
    },
    {
        id: 3,
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        editora: "Agir",
        ano: 1943,
        quant: 15,
        preco: 25.0
    },
    {
        id: 4,
        titulo: "Dom Quixote",
        autor: "Miguel de Cervantes",
        editora: "Saraiva",
        ano: 1936,
        quant: 5,
        preco: 60.0
    },
    {
        id: 5,
        titulo: "Nas Montanhas da Loucura",
        autor: "H.P Lovecraft",
        editora: "Nova Fronteira",
        ano: 1997,
        quant: 40,
        preco: 15.0
    },
    {
        id: 6,
        titulo: "O Gato Preto e Outras Histórias de suspense",
        autor: "Edgar Alan pOE",
        editora: "pandora",
        ano: 1954,
        quant: 10,
        preco: 25.5
    },
    {
        id: 7,
        titulo: "O Alienista",
        autor: "Machado de Assis",
        editora: "Principis",
        ano: 1882,
        quant: 7,
        preco: 35.9
    },
    {
        id: 8,
        titulo: "A culpa é das estrelas",
        autor: "Jonh Green",
        editora: "Intríseca",
        ano: 2012,
        quant: 5,
        preco: 35.5
    },
    {
        id: 9,
        titulo: "Maus",
        autor: "Art Spiegelman",
        editora: "Quadrinhos na Cia",
        ano: -500,
        quant: 0,
        preco: 29.9
    },
    {
        id: 10,
        titulo: "Robin Hood",
        autor: "Hoawrd Pyle",
        editora: "SM",
        ano: 206,
        quant: 13,
        preco: 75.5
    }
];

// Operações CRUD
app.get('/livros', (req, res) => {
    res.json(db);
});

app.post('/livros', (req, res) => {
    let lastId = Math.max(...db.map(l => l.id));
    const livro = {
        id: ++lastId,
        titulo: req.body.titulo,
        autor: req.body.autor,
        editora: req.body.editora,
        ano: req.body.ano,
        quant: req.body.quant,
        preco: req.body.preco
    };
    db.push(livro);
    res.json(db);
});

app.get('/livros/:id', (req, res) => {
    let livro = db.find(l => l.id === parseInt(req.params.id));
    if (livro) {
        res.json(livro);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

app.put('/livros/:id', (req, res) => {
    let livro = db.find(l => l.id === parseInt(req.params.id));
    if (livro) {
        livro.titulo = req.body.titulo || livro.titulo;
        livro.autor = req.body.autor || livro.autor;
        livro.editora = req.body.editora || livro.editora;
        livro.ano = req.body.ano || livro.ano;
        livro.quant = req.body.quant || livro.quant;
        livro.preco = req.body.preco || livro.preco;
        res.json(livro);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

app.delete('/livros/:id', (req, res) => {
    db = db.filter(l => l.id !== parseInt(req.params.id));
    res.json(db);
});

// Operações adicionais
app.get('/livros/editora/:editora', (req, res) => {
    let livros = db.filter(l => l.editora.toLowerCase() === req.params.editora.toLowerCase());
    res.json(livros);
});

app.get('/livros/titulo/:keyword', (req, res) => {
    let livros = db.filter(l => l.titulo.toLowerCase().includes(req.params.keyword.toLowerCase()));
    res.json(livros);
});

app.get('/livros/acima-preco/:preco', (req, res) => {
    let livros = db.filter(l => l.preco > parseFloat(req.params.preco));
    res.json(livros);
});

app.get('/livros/abaixo-preco/:preco', (req, res) => {
    let livros = db.filter(l => l.preco < parseFloat(req.params.preco));
    res.json(livros);
});

app.get('/livros/mais-recentes', (req, res) => {
    let livros = [...db].sort((a, b) => b.ano - a.ano);
    res.json(livros);
});

app.get('/livros/mais-antigos', (req, res) => {
    let livros = [...db].sort((a, b) => a.ano - b.ano);
    res.json(livros);
});

app.get('/livros/sem-estoque', (req, res) => {
    let livros = db.filter(l => l.quant === 0);
    res.json(livros);
});

// Endpoint inexistente
app.use((req, res) => {
    res.status(404).send('Endpoint não encontrado');
});
