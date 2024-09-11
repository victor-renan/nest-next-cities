import axx from "axios";

export default axx.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})