export const handleFileUpload = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    let uploadedFile = req.files.profileImage; 
    let uploadPath = __dirname + '/uploads/' + uploadedFile.name;
  
    uploadedFile.mv(uploadPath, (err) => {
      if (err)
        return res.status(500).send(err);
  
      res.json({ message: 'File uploaded successfully', filePath: uploadPath });
     
    });
  };