require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true
};

const {connectedToMySQl} = require('./connect');
const {checkAuthentication, restrictTo} = require('./middlewares/auth');
const {handleURLRedirect} = require('./controllers/url');

const urlRouter = require('./routes/url');
const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT;

connectedToMySQl();

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use('/', userRouter);
app.get('/redirect/:id', handleURLRedirect);
app.use(checkAuthentication);
app.use('/api', urlRouter);

app.listen(PORT, () => console.log(`Server started at: http://localhost:${PORT}`));