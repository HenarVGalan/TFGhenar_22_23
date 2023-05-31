import express, { Router } from 'express';

import puntoController from '../controllers/puntoController';


class PuntoRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }
    //  this.app.use('/api/punto', puntosRoutes); ->index
    config() {
        this.router.get('/', puntoController.index)
        this.router.get('/list', puntoController.list);
        this.router.get('/list/:idtramo', puntoController.listpuntostramo);
        this.router.get('/getCoordenadas', puntoController.setPuntos);
        //getGeoJsonInicioTramo
        this.router.get('/getInicioTramo', puntoController.getInicioTramo);
        this.router.get('/getFinTramo', puntoController.getFinTramo);
        //getEstaciones
        this.router.get('/getEstaciones', puntoController.getEstaciones);
       
        //  this.router.get('/:id', puntoController.getOne);
        // this.router.post('/', puntoController.create);
        // this.router.put('/:id', puntoController.update);
        // this.router.delete('/:id', puntoController.delete);
    }

}

export default new PuntoRoutes().router;