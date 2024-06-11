const fs = require('fs');
const path = require('path');

const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { photo } = require('../../db/querys.db');

const photoSchema = require('../../schemas/photo.schema');

const validate = require('../../validations/formData');

const uploadPhotoService = async (req, res) => {

    try {
        // Validar el esquema+;
        const error = validate(photoSchema)(req);
        
        if(error) throw error;

        const { pro_variant_id } = req.body;

        // Validar el ID en la base de datos
        // const result = await pgConnection.query(photoQuery.validateProVariantId, [pro_variant_id]);

        // if (result.rowCount === 0) {
        //     throw new BadRequestError(400, 'Invalid pro_variant_id');
        // }

        // Mover el archivo de la carpeta temporal a la carpeta final
        const tempFilePath = req.file.path;
        const uploadFolder = '../../../public/files/photos';
        const destinationFolder = path.join(__dirname, uploadFolder);
        const finalFilePath = path.join(destinationFolder, path.basename(tempFilePath));

        await new Promise((resolve, reject) => {
            fs.rename(tempFilePath, finalFilePath, (err) => {
                if (err) {
                    reject(moduleErrorHandler.handleError(err));
                }
                resolve();
            });
        });
        // Guardar la información del archivo en la base de datos
        // await pgConnection.query(photoQuery.insertPhoto, [path.basename(finalFilePath), finalFilePath, pro_variant_id]);

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