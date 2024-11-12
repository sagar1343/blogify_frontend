import dotenv from 'dotenv';


dotenv.config();
export const cloud_name = process.env.CLOUD_NAME;
export const upload_preset = process.env.UPLOAD_PRESET;