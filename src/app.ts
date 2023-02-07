import express from 'express';
import cors from "cors";
import morgan from 'morgan';
import path from 'path';
import router from './routes/api';

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/api', router);

export default app;