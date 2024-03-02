// multer-setup.js
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads'); // Make sure this folder exists
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

export const uploadFile = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 
    },
    fileFilter: fileFilter
});


