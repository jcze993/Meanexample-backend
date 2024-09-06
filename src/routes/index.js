const { Router} = require('express');
const router = Router();
const user = require('../models/User');
const jwt = require('jsonwebtoken')
router.get('/', (req, res) => res.send('seeeeeeee'))
router.post('/signup', async(req, res) => {
    //se extrae el correo y la clave y no con corchetes
    const {
        email,
        password
    } = req.body;
    const newUser = new user({
        email,
        password
    });
    await newUser.save();
    const token = jwt.sign({
        _id: newUser._id
    }, 'secretKey'); //se guarda para el inicio de sess..
    res.status(200).json({
        token
    }); //devuelve un token
});
router.post('/signin', async(req, res) => {
    const {
        email,
        password
    } = req.body;
    const User = await user.findOne({
        email: email
    }); //busca el correo segun lo que el user inserte
    if (!User) return res.status(401).send("The email doesn't exists");
    if (User.password !== password) return res.status(401).send("Wrong Password");
    const token = jwt.sign({
        _id: User._id
    }, 'secretKey');
    return res.status(200).json({
        token
    });
});
router.get('/tasks', (req, res) => {
    res.json(
        [{
            _id: 1,
            name: 'Task one',
            description: 'lorem ipsum',
            date: '2020-04-18T03:05:08.882Z'
        }]
    )
});
router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([{
        _id: 1,
        name: 'Task one private',
        description: 'lorem ipsum',
        date: '2020-04-18T03:05:08.882Z'
    }])
});
//para la validacion pero es poco segura o recomendada(busca otros metodos para prueba esta bien)
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unthorize Request')
    }
    const token = req.headers.authorization.split(' ')[1]
    if (token === null) {
        return res.status(401).send('Unathorize se Request')
    }
    const playload = jwt.verify(token, 'secretKey')
    req.userid = playload._id;
    next();
}
module.exports = router;