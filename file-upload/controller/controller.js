const uploadFile = require("../middleware/upload");
const fs = require("fs");
const path = require("path");
const upload = async (req, res) => {
  console.log(req.body);
  try {
    if (req.headers.code !== process.env.CODE) {
      return res.status(400).send({
        message: `Code is Incorrect ! TRY Again`,
      });
    }

    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 10MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];
    if (files.length === 0) {
      res.status(200).send(fileInfos);
    }

    files.forEach((file) => {
      fileInfos.push({
        name: file.slice(13),
        realname: file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const showex = (req, res) => {
  const fileNameWithoutExtension = req.params.name;
  const directoryPath = __basedir + "/assets/uploads/";

  // Function to search for a file without a specific extension
  const findFileWithoutExtension = (fileNameWithoutExtension) => {
    const files = fs.readdirSync(directoryPath);

    // Iterate through the files and check if any matches the provided name without extension
    for (const file of files) {
      const fileName = path.parse(file).name; // Get the file name without extension
      if (fileName === fileNameWithoutExtension) {
        return file;
      }
    }

    // If no matching file is found, return null
    return null;
  };

  // Find the file in the directory
  const fileName = findFileWithoutExtension(fileNameWithoutExtension);

  if (fileName) {
    // If the file is found, send it as a response
    res.sendFile(path.join(directoryPath, fileName), (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  } else {
    // If no matching file is found, return a 404 response
    res.status(404).send({
      message: "File not found",
    });
  }
};
const show = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/assets/uploads/";

  res.sendFile(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
const deleteFile = (req, res) => {
  const fileName = req.params.name; // Assuming the file name is provided in the URL parameters
  const directoryPath = __basedir + "/assets/uploads/";

  const filePath = path.join(directoryPath, fileName);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    try {
      // Attempt to delete the file
      fs.unlinkSync(filePath);

      res.status(200).send({
        message: `File ${fileName} deleted successfully.`,
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      res.status(500).send({
        message: `Could not delete the file: ${fileName}. ${error.message}`,
      });
    }
  } else {
    res.status(404).send({
      message: `File ${fileName} not found.`,
    });
  }
};

module.exports = {
  upload,
  getListFiles,
  download,
  show,
  showex,
  deleteFile,
};
