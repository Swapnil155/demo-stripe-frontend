import api from './api'

const userLogin = async (email, password) => {
    console.log(email, password)
    try {
        const login = await api.post(`/api/user/login`,{
            email,
            password
        })
        console.log(login)
        return login
    } catch (error) {
        console.log(error.response)
        return error.response
    }
}

const UserServices = {
    userLogin
}

export default UserServices