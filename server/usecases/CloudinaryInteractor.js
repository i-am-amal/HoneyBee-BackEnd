export const uploadProfilePic = async (filePath, cloudinary,removeFile) => {
  const options = {
    transformation: [
      { aspect_ratio: "1.0", gravity: "auto", width: 867, crop: "fill" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  };
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    removeFile(filePath)
    return result.url
  } catch (error) {
    console.error(error);
  }
};

export const uploadCoverPic = async (filePath, cloudinary,removeFile) => {
  const options = {
    transformation: [
      { aspect_ratio: "2.5", gravity: "auto", width: 1300, crop: "fill" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  };
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    removeFile(filePath)
   return result.url
  } catch (error) {
    console.error(error);
  }
};
export const image = async (filePath, cloudinary,removeFile) => {
  const options = {
    transformation: [
      { aspect_ratio: "1.0", gravity: "auto", width: 867, crop: "fill" },,
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  };
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    removeFile(filePath)
   return result.url
  } catch (error) {
    console.error(error);
  }
};