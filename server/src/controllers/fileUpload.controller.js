import path from "path";

const DEFAULT_IMG_PATH = "/default-profileImage.png";
const DEFAULT_GRP_IMG_PATH = "/default-grp-img.png";

const UPLOAD_DIR = path.join(__dirname, "../../public/images/");

//reusing this for profile picture, post image and group icon
//helpers exported at bottom.

export const handleFileUpload =
  (
    targetDir,
    isProfilePic = false,
    isPostImg = false,
    isGrpIcon = false
  ) =>
  (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      if (isProfilePic) {
        req.filePath = DEFAULT_IMG_PATH;
      } else if (isPostImg) {
        req.filePath = null;
      } else if (isGrpIcon) {
        req.filePath = DEFAULT_GRP_IMG_PATH;
      }

      return next();
    }

    const uploadedFile = req.files.file;

    const fileNameUnique = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    const fileExtension = path.extname(uploadedFile.name);
    const fileName = `${fileNameUnique}${fileExtension}`;

    const uploadPath = path.join(targetDir, fileName);

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

// for profile picture
export const handleRegProfilePicUpload = handleFileUpload(
  UPLOAD_DIR,
  true
);

// for posts
export const handlePostImageUpload = handleFileUpload(
  UPLOAD_DIR,
  false,
  true
);

//for group icons
export const handleGroupIconUpload = handleFileUpload(
  UPLOAD_DIR,
  false,
  false,
  true
);
