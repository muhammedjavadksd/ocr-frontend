import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export async function uploadFile(frontSide, backSide) {
    try {
        console.log(frontSide);
        console.log(backSide);
        const { data: response } = await instance.post("/upload-file", { front: frontSide, back: backSide }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return response
    } catch (e) {
        const msg = e?.response?.data?.msg || "Internal server error"
        return {
            status: false,
            msg: msg
        }
    }
}