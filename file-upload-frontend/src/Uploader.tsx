import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useToast } from "./@/components/ui/use-toast";

const Uploader: React.FC = () => {
  const { toast } = useToast();

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

      if (response.status === 200) {
        console.log("File uploaded successfully");
        toast({
          title: "File Uploaded Successfully",
          description: `${file?.name} has been uploaded to the server `,
          variant: "success",
        });
        setCode("");
        setFile(null);
      } else {
        console.error("File upload failed");
        toast({
          title: "File Upload Failed",
          description: "Failed due to internal server error",
          variant: "destructive",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error message:", error.response?.data.message);
        toast({
          title: error.response?.data.message,
          description: "Failure you are very bad !!",
          variant: "destructive",
        });
      } else {
        console.error("Non-Axios error:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-center items-center text-gray-100 bg-black bg-opacity-95 ">
      <form
        onSubmit={handleSubmit}
        className="border-[1px] px-8 py-10 rounded-md border-opacity-20 border-gray-300 flex flex-col gap-2 "
      >
        <label>
          <h1 className="mb-2 font-semibold">Code:</h1>
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="******"
            className="border-[1px] rounded-md border-opacity-20 border-gray-300 focus:outline-none p-2 text-[16px] bg-black bg-opacity-95 text-gray-500 font-medium w-full "
          />
        </label>
        <br />

        <input
          type="file"
          onChange={handleFileChange}
          className="border-[1px] rounded-md border-opacity-20 border-gray-300 focus:outline-none p-2 text-[16px] text-gray-500 font-medium w-full  file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-pink-50 file:text-pink-700
        hover:file:bg-pink-100 cursor-pointer"
        />
        <br />
        <button
          type="submit"
          className="flex flex-col bg-pink-50 text-pink-700 hover:bg-pink-200 transition-100 cursor-pointer border-[1px] text-[14px] font-medium rounded-md border-opacity-20 border-gray-300 w-24 p-2 items-center justify-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Uploader;
// class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
