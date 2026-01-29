import { v2 as cloudinary } from "cloudinary";

import { ENV } from "./env.js";

const secret = ENV.CLOUDINARY_API_SECRET || "";
if (secret.startsWith("signkey-")) {
  console.warn(
    "[Cloudinary] CLOUDINARY_API_SECRET looks like an Inngest key. Use your Cloudinary API secret from https://console.cloudinary.com/ instead, or image uploads will fail."
  );
}

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

export default cloudinary;
