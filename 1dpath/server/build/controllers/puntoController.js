"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PuntoController {
    index(req, res) {
        // res.send('tramosController');
        // db.query('DESCRIBE tramos');
        res.json({ text: 'puntoController' });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Primero necesitamos la geometría de puntos aleatorios de cada tramo F
            //const puntosGEOM = await db.query("SELECT ST_AsGeoJSON(st_generatepoints(geom,5,1996)) as geojson, ogc_fid as id FROM public.network01_4326 LIMIT 2 ");
            // res.json(puntosGEOM);
            console.log("SELECT ST_AsGeoJSON(st_generatepoints(geom,5,1996)) as geojson, ogc_fid as id FROM public.network01_4326 LIMIT 2 ");
        });
    }
    getCoordenadasPuntostramo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const { id } = req.params;
            //Primero sacamos un punto centro de cada tramo, punto formato geometría
            const centrosGEOM = yield database_1.default.query('Select ST_Centroid(geom) as centroTramo, ogc_fid as id FROM public.network01_4326');
            //Segundo para cada punto necesitamos hallar sus coordenadas, formato geometría a 
            centrosGEOM.forEach((obj) => __awaiter(this, void 0, void 0, function* () {
                //console.log(obj.centrotramo);       
                const xY = yield database_1.default.query("SELECT ST_X('" + obj.centrotramo + "') as longitud , ST_Y('" + obj.centrotramo + "') as latitud");
                //Tercero actualizamos la tabla public.network01_4326 añadiendo, para cada tramo, las coordenadas de tu punto centro
                xY.forEach((obj2) => __awaiter(this, void 0, void 0, function* () {
                    yield database_1.default.query('UPDATE public.network01_4326 set latitud=' + obj2.latitud + ' , longitud=' + obj2.longitud + '  WHERE ogc_fid=' + obj.id);
                    //console.log('UPDATE  public.network01_4326 set latitud='+ obj2.latitud+' , longitud='+ obj2.longitud+'  WHERE ogc_fid='+obj.id );
                }));
            }));
            //Cuarto mostramos como resultado las coordenadas del punto centro de todos los tramos
            const coordenadasCentroTramo = yield database_1.default.query('SELECT ogc_fid,longitud,latitud FROM public.network01_4326 ORDER BY ogc_fid ASC');
            res.json(coordenadasCentroTramo);
        });
    }
    //FUNCION entrada: geometría de un punto y de salidas las coordenadas
    //ST_Points
    getCoordenadas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tramo_puntosJSON = yield database_1.default.query('Select ST_AsGeoJSON(ST_Points(geom))as multipoints, ogc_fid as idtramo  FROM public.network01_4326 ORDER BY idTramo');
            // ST_AsGeoJSON
            //console.log(puntoGEOM);
            //res.json(puntoGEOM);
            //Segundo para cada punto necesitamos hallar sus coordenadas, formato geometría a puntos coordenadas
            // SELECT ST_X(ST_intersection(geom, geom)), ST_Y(ST_intersection(geom, geom))
            // console.log(JSON.parse((tramo_puntosJSON[0]['multipoints'])));
            // const coordenadas = (JSON.parse((tramo_puntosJSON[0]['multipoints']))).coordinates;
            //  res.json(tramo_puntosJSON);
            // const multipoints = (JSON.parse((tramo_puntosJSON[0]['multipoints'])));
            //const multipoints = (JSON.parse((tramo_puntosJSON[0])));
            //const coordenadas = multipoints.coordinates;
            // console.log(multipoints);
            tramo_puntosJSON.forEach((punto) => __awaiter(this, void 0, void 0, function* () {
                //console.log('\n' + (obj['multipoints']));
                // console.log(JSON.parse(punto['multipoints']));
                var coordenadas = JSON.parse(punto['multipoints']).coordinates;
                //console.log("Grupo Coordenadas\n" + coordenadas);
                //console.log('\n' + (punto.idtramo));
                coordenadas.forEach((coord) => __awaiter(this, void 0, void 0, function* () {
                    //console.log("\n > (" + coord[0] + "," + coord[1] + ")");
                    //console.log('tramo: ' + (punto.idtramo));
                    //  console.log(" Select ST_IsValid( ST_SetSRID(ST_MakePoint(coord[0], coord[1] ),4326)) FROM public.network01_4326");
                    // ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326);
                    //const geometrías = await db.query("Select ST_SetSRID(ST_MakePoint(" + coord[0] + "," + coord[1] + "),4326) as geom");
                    // geometrías.forEach(async (obj: any) => {               
                    yield database_1.default.query("INSERT INTO public.punto (ogc_fid_tramo,x,y,geom) VALUES (" + punto.idtramo + "," + coord[0] + "," + coord[1] + ",(ST_SetSRID(ST_MakePoint(" + coord[0] + "," + coord[1] + "),4326)))");
                    // console.log("INSERT INTO public.punto (ogc_fid_tramo,x,y,geom) VALUES (" + punto.idtramo + "," + coord[0] + "," + coord[1] + ",( ST_SetSRID(ST_MakePoint(" + coord[0] + "," + coord[1] + "),4326))");
                    //await db.query('UPDATE public.network01_4326 set latitud=' + obj2.latitud + ' , longitud=' + obj2.longitud + '  WHERE ogc_fid=' + obj.id);
                    //console.log('UPDATE  public.network01_4326 set latitud='+ obj2.latitud+' , longitud='+ obj2.longitud+'  WHERE ogc_fid='+obj.id );
                    // });
                    // console.log('*****\n ');
                    // res.json(geom);
                    //await db.query("INSERT INTO public.punto set ogc_fid_tramo=" + punto.idtramo + ", x=" + coord[0] + ", y=" + coord[1]+",geom=" + geom+" ");
                    //console.log("INSERT INTO public.punto set ogc_fid_tramo=" + punto.idtramo + ", x=" + coord[0] + ", y=" + coord[1]+",geom=" + geom);   
                }));
                // res.json();
                // console.log("SELECT GeometryType('" + obj.punto + "')as geometriatipo ");
                // const xY = await db.query("SELECT ST_X('" + obj.punto + "') as x , ST_Y('" + obj.punto + "') as y");
                //res.json(xY);  
                //     //esto está mal , revisar
                //     const xY = await db.query("SELECT ST_X(ST_intersection('" + obj.punto + "','" + obj.punto + "')) as x , ST_Y(ST_intersection('" + obj.punto + "','" + obj.punto + "')) as y");
                //     console.log("SELECT ST_X(ST_intersection('" + obj.punto + "','" + obj.punto + "')) as x , ST_Y(ST_intersection('" + obj.punto + "','" + obj.punto + "')) as y");
                //     // res.json(xY);
                //     //Tercero actualizamos la tabla public.network01_4326 añadiendo, para cada tramo, las coordenadas de tu punto centro
                //     xY.forEach(async (obj2: any) => {
                //         //await db.query('UPDATE public.Punto set latitud=' + obj2.latitud + ' , longitud=' + obj2.longitud + '  WHERE ogc_fid=' + obj.id);
                //         //await db.query('INSERT INTO public.punto set geom=' + tramo_puntosCOORJSON + ', y=' + obj2.y + ' , x=' + obj2.longitud + ' ogc_fidTramo=' + puntoGEOM.id);
                //         //console.log('UPDATE  public.network01_4326 set latitud='+ obj2.latitud+' , longitud='+ obj2.longitud+'  WHERE ogc_fid='+obj.id );
            }));
            // });
        });
    }
    getInicioTramo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Primero sacamos un punto inicio de cada tramo, punto formato geometría
            const inicioGeoJson = yield database_1.default.query('Select puntoInicio_latitud as lat, puntoInicio_longitud as long FROM public.network01_4326');
            res.json(inicioGeoJson);
        });
    }
    getFinTramo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Primero sacamos un punto inicio de cada tramo, punto formato geometría
            const finGeoJson = yield database_1.default.query('Select puntoFin_latitud as lat, puntoFin_longitud as long FROM public.network01_4326');
            res.json(finGeoJson);
        });
    }
}
const puntoController = new PuntoController();
exports.default = puntoController;
