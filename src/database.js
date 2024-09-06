const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/angularmean', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is Connected'))
    .catch(err => console.log(err));