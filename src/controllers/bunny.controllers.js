import axios from 'axios';
import fs from 'fs-extra';
import https from 'https'

export const createVideo = async (req, res) => {
    try {
        if (!req.files || !req.files.video) {
            return res.status(400).json({ message: 'No se ha cargado ningún video.' });
        }
        const filePath = req.files.video.tempFilePath;
        const fileName = req.files.video.name;
        let response;
        try {
            response = await axios.post(
                `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY}/videos`,
                { title: fileName },
                {
                    headers: {
                        accept: 'application/json',
                        'content-type': 'application/json',
                        AccessKey: process.env.BUNNY_STREAM_ACCESS_KEY
                    }
                }
            );
        } catch (error) {
            console.error('Error creando video en BunnyCDN:', error.response ? error.response.data : error.message);
            return res.status(500).json({ message: 'Error al crear el video en BunnyCDN', details: error.response ? error.response.data : error.message });
        }
        if (!response.data.guid) {
            console.error('Respuesta inesperada al crear video:', response.data);
            throw new Error('Error al crear el video en BunnyCDN');
        }
        let uploadResponse;
        try {
            uploadResponse = await axios({
                method: 'PUT',
                url: `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY}/videos/${response.data.guid}`,
                headers: {
                    accept: 'application/json',
                    AccessKey: process.env.BUNNY_STREAM_ACCESS_KEY,
                    'Content-Type': 'application/octet-stream'
                },
                data: fs.createReadStream(filePath),
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            });
        } catch (error) {
            console.error('Error subiendo video a BunnyCDN:', error.response ? error.response.data : error.message);
            return res.status(500).json({ message: 'Error al subir el video a BunnyCDN', details: error.response ? error.response.data : error.message });
        }
        await fs.remove(filePath)
        return res.json(`https://iframe.mediadelivery.net/embed/${process.env.BUNNY_STREAM_LIBRARY}/${response.data.guid}`);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

export const uploadImage = async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'No se ha cargado ninguna imagen.' });
        }

        const filePath = req.files.image.tempFilePath; // Ruta del archivo temporal
        const fileName = req.files.image.name.replace(' ', '-'); // Nombre original del archivo

        const uploadFile = async () => {
            return new Promise((resolve, reject) => {
                const readStream = fs.createReadStream(filePath); // Leer el archivo

                const options = {
                    method: 'PUT',
                    host: 'storage.bunnycdn.com',
                    path: `/${encodeURIComponent(process.env.BUNNY_STORAGE_NAME)}/${encodeURIComponent(fileName)}`, // Ruta de subida en BunnyCDN
                    headers: {
                        accept: 'application/json',
                        AccessKey: process.env.BUNNY_CDN_API, // Clave de acceso BunnyCDN
                        'Content-Type': 'application/octet-stream',
                    },
                };

                const req = https.request(options, (res) => {
                    let responseData = '';

                    res.on('data', (chunk) => {
                        responseData += chunk.toString(); // Acumulamos los datos de la respuesta
                    });

                    res.on('end', () => {
                        if (res.statusCode === 201) { // Si es exitoso (HTTP 201)
                            const imageUrl = `https://${process.env.BUNNY_CDN_NAME}.b-cdn.net/${fileName}`; // URL final de la imagen
                            resolve(imageUrl); // Resolvemos con la URL
                        } else {
                            reject(new Error(`Error en la subida: ${responseData}`)); // Rechazamos si hay error
                        }
                    });
                });

                req.on('error', (error) => {
                    reject(error); // Manejo de errores
                });

                readStream.pipe(req); // Enviamos el archivo
            });
        };

        const imageUrl = await uploadFile(); // Esperamos a que se suba la imagen
        await fs.remove(filePath); // Eliminamos el archivo temporal

        return res.json(imageUrl); // Devolvemos la URL de la imagen
    } catch (error) {
        return res.status(500).json({ message: error.message }); // En caso de error
    }
};