import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { v4 } from "uuid";

const __dirname = dirname(fileURLToPath(import.meta.url))

const fileUpload = ( files, allowedFiles =  ["png", "jpg", "jpeg", "gif"], carpeta = '' ) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const shortedName = file.name.split(".");
    const extension = shortedName[shortedName.length - 1];

    if (!allowedFiles.includes(extension)) {
        return reject(`Tipo de archivo ${extension} no permitido!`)
    }

    const tempName = v4() + "." + extension;
    const uploadPath = join(__dirname, "../uploads/", carpeta, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err)
      }
      resolve( tempName )
    });
  });
};

export default fileUpload;
