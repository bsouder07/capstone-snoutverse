import React, { useState } from "react";

const UploadFile = ({ onFileChange }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); 
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      onFileChange(file);

    
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
     <input type="file" onChange={handleFileChange}/>
     {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '100px', height: '100px' }}/>}
    </div>
  );
};

export default UploadFile;
