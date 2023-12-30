import axios from "axios";
import React, { useState } from "react";

const UploadFile = ({ onFileChange }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  // const [previewUrl, setPreviewUrl] = useState(null);

   const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {

      onFileChange(file);

    }
  }

  return (
    <div>
     <input type="file" file="profileImage" onChange={handleFileChange}/>
     {/* {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: '100px', height: '100px' }}/>} */}
    </div>
  );
};

export default UploadFile;

// import axios from "axios";
// import React, { useState } from "react";

// const UploadFile = () => {
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState({ started: false, pc: 0 });

//   function handleUpload() {
//     if (!file) {
//       console.log("no file selected");
//       return;
//     }

//     const fd = new FormData();
//     fd.append('file', file);

//     // Add your upload logic here
//   }

//   return (
//     <div className="file-upload">
//       <h1> Uploading Files </h1>
//       <input onChange={(e) => setFile(e.target.files[0])} type="file" />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default UploadFile;
