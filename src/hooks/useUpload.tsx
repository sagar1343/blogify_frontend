import axios from "axios";
import { cloud_name, upload_preset } from "../service/cloudinary";

function useUpload() {
  async function cloudinaryUpload(file: File | undefined) {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      return null;
    }
  }
  return cloudinaryUpload;
}

export default useUpload;
