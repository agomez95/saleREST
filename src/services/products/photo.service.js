const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { BadRequestError } = require('../../errors/httpError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { photo, variant } = require('../../db/querys.db');

const photoSchema = require('../../schemas/photo.schema');

const validate = require('../../validations/formData');

const uploadPhotoService = async (req, res) => {
    const pgDB = new pgConnection();

    try {
        await pgDB.connect();

        // Validar el esquema+;
        const error = validate(photoSchema)(req);
        
        if(error) throw error;

        const { pro_variant_id } = req.body;

        // Validar el ID en la base de datos
        const exist = await pgDB.query(variant.variant_exist, [pro_variant_id]);

        if (!exist[0].variant_exists) throw new BadRequestError(400, 'INVALID VARIANT ID');

        // Obtener el número de fotos ya existentes de la variante
        const count = await pgDB.query(photo.count_variant_photo, [pro_variant_id]);

        // Generar el nombre del archivo
        const photoNumber = String(count[0].count_variant_photo + 1).padStart(2, '0'); // Asegurar que el número tenga dos dígitos
        const photoName = `${pro_variant_id}_${photoNumber}`;

        // Ruta del archivo temporal en el servidor
        const tempFilePath = req.file.path;

        // Atributos de la imagen
        const { width, height } = await sharp(tempFilePath).metadata();
        const type = req.file.mimetype.split('/')[1];
        const size = parseFloat((req.file.size / (1024 * 1024)).toFixed(2));

        // Mover el archivo de la carpeta temporal a la carpeta final con el nuevo nombre
        const uploadFolder = '../../../public/files/photos';
        const destinationFolder = path.join(__dirname, uploadFolder);
        const finalFilePath = path.join(destinationFolder, `${photoName}.${type}`);
        
        const result = await pgDB.selectFunction(photo.add_photo_variant, { size: size, height: height, width: width, type: type, destinationFolder: destinationFolder, photoName: photoName, pro_variant_id: Number(pro_variant_id) });
        
        await new Promise((resolve, reject) => {
            fs.rename(tempFilePath, finalFilePath, (err) => {
                if (err) {
                    reject(moduleErrorHandler.handleError(err));
                }
                resolve();
            });
        });
    
        const response = {
            status: HTTP_RESPONSES.CREATED,
            service: 'uploadPhotoService',
            message: 'Photo uploaded successfully',
            file: {
                filename: req.file.originalname,
                path: finalFilePath
            }
        };

        return response;
    } catch (error) {
        // Eliminar el archivo temporal en caso de error
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting temp file:', err);
            });
        }
        moduleErrorHandler.handleError(error);
    }
};

const getPhotosByProductService = () => {

};

module.exports = {
    uploadPhotoService,
    getPhotosByProductService
};