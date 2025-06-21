import multer from "multer";

// Use memoryStorage to store uploaded files in memory as Buffer
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    // Limit file size to 5MB
    fileSize: 5 * 1024 * 1024
  }
});

export default upload;
