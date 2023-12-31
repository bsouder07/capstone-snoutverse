import React, { useState } from "react";

const UploadFile = ({ onFileChange }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {previewUrl && (
        <img
          className="preview-image"
          src={previewUrl}
          alt="Preview"
          style={{ width: "100px", height: "100px" }}
        />
      )}
    </div>
  );
};

export default UploadFile;
