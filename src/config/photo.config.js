const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento temporal
const tempStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/files/temp')); // Ajusta la ruta temporal
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Verificador de archivos: descubri que usando esto como middleware el upload no funciona
const verificator = multer({
    storage: tempStorage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limitar tamaño a 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
            cb(null, true);
        } else {
            cb(new Error('INVALID FILE TYPE, ONLY JPEG, PNG, AND WEBP ARE ALLOWED.'));
        }
    }
}).single('photo');


module.exports = {
    verificator
};
