import { Request, Response } from 'express';
import fetch from 'node-fetch';

class AemetController {
    //api_key= eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZW5hci52ZWxhc2NvMUBhbHUudWNsbS5lcyIsImp0aSI6ImNhZDJmZDk2LTA4MDctNGMyMy05ZmIzLTJkMjFkNGUxNjBkNCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjg1MDk1MTk2LCJ1c2VySWQiOiJjYWQyZmQ5Ni0wODA3LTRjMjMtOWZiMy0yZDIxZDRlMTYwZDQiLCJyb2xlIjoiIn0.eOvtg2o-bfmL_JesnFGbE_bgZsWT5naIKMhTPg77o5E
    // public options = {
    //     api_key: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZW5hci52ZWxhc2NvMUBhbHUudWNsbS5lcyIsImp0aSI6ImNhZDJmZDk2LTA4MDctNGMyMy05ZmIzLTJkMjFkNGUxNjBkNCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjg1MDk1MTk2LCJ1c2VySWQiOiJjYWQyZmQ5Ni0wODA3LTRjMjMtOWZiMy0yZDIxZDRlMTYwZDQiLCJyb2xlIjoiIn0.eOvtg2o-bfmL_JesnFGbE_bgZsWT5naIKMhTPg77o5E',
    //     headers: {
    //         'accept': 'application/json',
    //     }
    // }
    // constructor() {
    // this.options = {
    //     api_key: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZW5hci52ZWxhc2NvMUBhbHUudWNsbS5lcyIsImp0aSI6ImNhZDJmZDk2LTA4MDctNGMyMy05ZmIzLTJkMjFkNGUxNjBkNCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjg1MDk1MTk2LCJ1c2VySWQiOiJjYWQyZmQ5Ni0wODA3LTRjMjMtOWZiMy0yZDIxZDRlMTYwZDQiLCJyb2xlIjoiIn0.eOvtg2o-bfmL_JesnFGbE_bgZsWT5naIKMhTPg77o5E',           
    //     headers: {
    //         'accept': 'application/json',
    //    }
    // };
    //  this.options = {
    //     "method": "GET",
    //     "hostname": "opendata.aemet.es",
    //     "api_key": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZW5hci52ZWxhc2NvMUBhbHUudWNsbS5lcyIsImp0aSI6ImNhZDJmZDk2LTA4MDctNGMyMy05ZmIzLTJkMjFkNGUxNjBkNCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjg1MDk1MTk2LCJ1c2VySWQiOiJjYWQyZmQ5Ni0wODA3LTRjMjMtOWZiMy0yZDIxZDRlMTYwZDQiLCJyb2xlIjoiIn0.eOvtg2o-bfmL_JesnFGbE_bgZsWT5naIKMhTPg77o5E",
    //     "headers": {
    //       "cache-control": "no-cache"
    //     }
    //   };
    // }


    public index(req: Request, res: Response) {
        res.json({ text: 'Aemet Controller' });
    }

    public async getData(req: Request, res: Response): Promise<void> {
        const { idema } = req.params;
        const url = "https://opendata.aemet.es/opendata/api/valores/climatologicos/diarios/datos/fechaini/2023-05-28T00%3A00%3A00UTC/fechafin/2023-05-28T23%3A00%3A00UTC/estacion/2829B";
        try {
            await fetch("https://opendata.aemet.es/opendata/api/valores/climatologicos/diarios/datos/fechaini/2023-05-25T00:00:00UTC/fechafin/2023-05-26T23:59:59UTC/estacion/" + idema + "/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZW5hci52ZWxhc2NvMUBhbHUudWNsbS5lcyIsImp0aSI6ImNhZDJmZDk2LTA4MDctNGMyMy05ZmIzLTJkMjFkNGUxNjBkNCIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjg1MDk1MTk2LCJ1c2VySWQiOiJjYWQyZmQ5Ni0wODA3LTRjMjMtOWZiMy0yZDIxZDRlMTYwZDQiLCJyb2xlIjoiIn0.eOvtg2o-bfmL_JesnFGbE_bgZsWT5naIKMhTPg77o5E")
                .then(res => res.json())
                .then(async response => {
                    console.log(response.datos);
                    // Obtener el enlace al fichero
                    const fileUrl = response.datos;
                    if (!fileUrl) {
                        throw new Error('No se encontró el enlace al fichero');
                    }
                    // Descargar el fichero
                    const fileResponse = await fetch(fileUrl);
                    if (!fileResponse.ok) {
                        throw new Error(`Error al descargar el fichero! status: ${fileResponse.status}`);
                    }
                    // Leer el contenido del fichero
                    const fileContent = await fileResponse.text();
                    console.log(fileContent);
                })
        } catch (err) {
            console.log(err);
        }
    }
    //todo un metodo que reciba por parámetro fileContent
    //borre e inserte nuevos datos
    

}

const aemetController = new AemetController();
export default aemetController;