import express, { Router, response } from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/Pointscontroller';
import ItemsController from './controllers/Itemscontroller';



const routes = express.Router();
const upload = multer(multerConfig);



const pointscontroller = new PointsController();
const itemscontroller = new ItemsController();




routes.get('/items', itemscontroller.index);


routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    },{
        abortEarly: false
    }),
    pointscontroller.create);


routes.get('/points', pointscontroller.index);
routes.get('/points/:id', pointscontroller.show);






export default routes;