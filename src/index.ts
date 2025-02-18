import express                              from 'express';
import { ErrorHandlerMiddleware }           from './infrastructure/middlewares/ErrorHandlerMiddleware';
import { routes }                           from './infrastructure/routes/routes';

const app = express();
app.use(express.json());

app.use(routes);
app.use(ErrorHandlerMiddleware.handle);
app.listen(3000, () => console.log("SERVER ONLINE"));