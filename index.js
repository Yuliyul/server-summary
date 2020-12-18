const express = require('express');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const expresshbs = require('express-handlebars');
const app = express();
const hbs = expresshbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});
const path = require('path');
const CrudRoutes = require('./routes/crud');
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(CrudRoutes);
app.use(express.static(path.join(__dirname, 'public')));
async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://yuliya:kRZJB9MfbkvGtjv@cluster0.odwjp.mongodb.net/localmachines',
            {
                useNewUrlParser: true,
                //useFindAndModify: false,
            }
        );
        app.listen(PORT, () => {
            console.log('Server started');
        });
    } catch (e) {
        console.log(e);
    }
}
start();
