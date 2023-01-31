const express = require('express');
require('express-async-errors');
const categoriesRouter = require('./router/categorie');
const loginRouter = require('./router/login');
const userRouter = require('./router/user');
const postRouter = require('./router/posts');
const errorHandler = require('./middlewares/error');
// ...
const app = express();

app.use(express.json());

app.use('/post', postRouter);

app.use('/categories', categoriesRouter);

app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use(errorHandler);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
