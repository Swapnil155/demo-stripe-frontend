import api from './api'


const makepayment = async (payemtMethodID, subscription, user_id, price, email) => {
    try {
        const response = await api.post('/api/payment', {
            payemtMethodID,
            subscription,
            user_id,
            price,
            email
        })
        console.log(response)
        return response
    } catch (error) {
        console.log(error.response)
        return error.response
    }
}

const paymentServices = {
    makepayment,
}

export default paymentServices