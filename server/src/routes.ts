import express, { Router, response } from 'express';
import PointsController from './controllers/Pointscontroller';
import ItemsController from './controllers/Itemscontroller';


const routes = express.Router();


const pointscontroller = new PointsController();
const itemscontroller = new ItemsController();



routes.get('/items', itemscontroller.index);

routes.post('/points', pointscontroller.create);
routes.get('/points', pointscontroller.index);
routes.get('/points/:id', pointscontroller.show);






export default routes;