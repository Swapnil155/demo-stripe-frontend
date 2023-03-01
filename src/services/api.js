import axios from 'axios'

const instance = axios.create({
    // baseURL: "http://localhost:5000",
    baseURL: "https://backend-mo-t.vercel.app/",
    headers: {
        "Content-Type": "application/json",
    }
})

export default instance