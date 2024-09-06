const express = require('express');
const app = express();
const cors = require('cors');
require('./database');
app.use(cors());
app.use(express.json());//interpreta datos en formato json
app.use('/api', require('./routes/index'))
app.listen(3241);
console.log("server on port :", 3241);
