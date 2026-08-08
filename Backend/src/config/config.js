import { config } from "dotenv";
config()
const Config = {
    PORT:process.env.PORT,
    MISTRAL_API_KEY:process.env.MISTRAL_API_KEY,
    CLIENT_URL:process.env.CLIENT_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    MONGODB_URL:process.env.MONGODB_URL
}
export default Config