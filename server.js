const express = require('express');
const app = express();
const PORT = 3000;
const secretKey = 'secretKey';
const jwt = require('jsonwebtoken');
const { expressjwt: exjwt } = require('express-jwt');
const path = require('path');
const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const budget = {
    myBudget: [
        {
            title: 'Solar-Powered Trains',
            budget: 100
        }, 
        {
            title: 'Bladeless Wind Energy',
            budget: 50
        },
        {
            title: '"Rechargable" Tires',
            budget: 200
        }
    ]
}
const price = {
    myPrice: [
        {
            title: 'Solar-Powered Trains',
            price: 10
        }, 
        {
            title: 'Bladeless Wind Energy',
            price: 16
        },
        {
            title: '"Rechargable" Tires',
            price: 15
        }
    ]
}

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.get('/price', (req, res) => {
    res.json(price);
});


app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256'],
});

const users = [
    {
        id: 1,
        username: 'Quatoria',
        password: 'Quatoria'
    },
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
            expiresIn: '50d',
        });
        res.json({ success: true, err: null, token });
    } else {
        res.status(401).json({ success: false, token: null, err: 'Invalid. Try Again' });
    }
});

app.get('/api/dashboard', jwtMW, (req, res) => {
    res.json({ success: true, myContent: 'Secret Dashboard Content' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ success: false, err: 'Unauthorized' });
    } else {
        next(err);
    }
});

app.use('/', express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
