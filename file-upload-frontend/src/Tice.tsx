import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const Tice: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      }
      const response = await axios.post(
        `http://localhost:8000/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            code: code,
          },
        }
      );
      //   const response = await fetch("http://localhost:8000/api/upload", {
      //     method: "POST",
      //     body: formData,
      //     headers: {
      //       code: code,
      //     },
      //   });

      if (response) {
        console.log("File uploaded successfully");
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Code:
          <input type="text" value={code} onChange={handleCodeChange} />
        </label>
        <br />
        <label>
          File:
          <input type="file" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Tice;
