const multer = require("multer");
const {
  cloudinaryInstance: cloudinary,
  cloudinary: cloudinaryConfig,
} = require("../config/config");
const { Readable } = require("stream");

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

const uploadSingle = upload.single("image");

// Helper function to upload image to Cloudinary and return promise
// type: "services" | "staff" | undefined (for base folder)
const uploadToCloudinary = (fileBuffer, type = null) => {
  return new Promise((resolve, reject) => {
    // Get folder configuration from config
    let folder = cloudinaryConfig.folder;

    // Build folder path based on type
    if (type === "services") {
      folder = `${cloudinaryConfig.folder}/${cloudinaryConfig.sub_folder_services}`;
    } else if (type === "staff") {
      folder = `${cloudinaryConfig.folder}/${cloudinaryConfig.sub_folder_staff}`;
    }
    // If type is null/undefined, use base folder only

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    // Create readable stream from buffer
    const bufferStream = new Readable();
    bufferStream.push(fileBuffer);
    bufferStream.push(null);
    bufferStream.pipe(stream);
  });
};

module.exports = {
  uploadSingle,
  uploadToCloudinary,
};
