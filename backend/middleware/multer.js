// Import multer for handling file uploads
import multer from 'multer';
// Import path to manage and work with file and directory paths
import path from 'path';

// Define storage strategy for multer using diskStorage (files will be stored locally)
const storage = multer.diskStorage({
  
  // Specify the destination folder for storing uploaded files
  destination: (req, file, cb) => {
    // 'cb' stands for callback; first argument is error (null means no error),
    // second is the path where files will be saved
    cb(null, './public'); 
    // ⚠️ Make sure './public' folder exists at root level or multer will throw an error
  },

  // Define the file naming convention for uploaded files
  filename: (req, file, cb) => {
    // Create a unique name using timestamp and original filename
    // Replace commas and whitespace in original file name for safety
    const uniqueName = Date.now() + '-' + file.originalname
      .replace(/,/g, '')        // remove commas
      .replace(/\s/g, '_');     // replace spaces with underscores

    // Set the filename in callback
    cb(null, uniqueName);
  }
});

// Initialize multer with the storage config
const upload = multer({ storage });

// Export the configured multer instance to be used in routes/controllers
export default upload;
