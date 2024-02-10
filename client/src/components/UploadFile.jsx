import React, { useState } from "react";

const UploadFile = ({ onFileChange, showPrevImg, fileRef }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      onFileChange(file);
      setPreviewUrl(file);

      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <input
        type="file"
        name="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        ref={fileRef}
      />
      {showPrevImg && previewUrl && (
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
