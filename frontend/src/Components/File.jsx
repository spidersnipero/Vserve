import React, { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isdone, setisdone] = useState("");

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = async () => {
    setisdone("st");
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://localhost:3003/file/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded:", data);
        setisdone("done");
        // Do something with the URL (e.g., display it, store it in state, etc.)
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={fileChangeHandler} />
      <button onClick={fileUploadHandler}>Upload</button>
      {isdone === "done" && <p>Fdone</p>}
      {isdone === "st" && <p>File st</p>}
    </div>
  );
};

export default FileUpload;
