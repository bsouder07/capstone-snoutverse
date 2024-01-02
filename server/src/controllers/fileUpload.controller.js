import path from "path";

const UPLOAD_DIR = path.join(__dirname, "../../public/images/");

export const handleFileUpload = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    req.filePath = "/public/default-profileImage.png"; //if there is no file uploaded, use the default image
    return next();
  }

  const uploadedFile = req.files.file;

  const fileNameUnique = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 15)}`;

  const fileExtension = path.extname(uploadedFile.name);
  const fileName = `${fileNameUnique}${fileExtension}`;

  const uploadPath = path.join(UPLOAD_DIR, fileName);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    req.filePath = `/images/${fileNameUnique}${fileExtension}`;

    //pass to the next middleware (which is the controller/route in this case), req.filePath will now
    //contain the path for saving in db.
    next();
  });
};
