import fs from 'fs'

function removeFile(filePath) {
  fs.unlink(filePath, (error) => {
    if (error) {
      console.error('Error removing file:', error);
    } else {
      console.log('File removed successfully');
    }
  });
}

export default removeFile