import ApiClient from './ApiClient'

export const __CreateUser = async (formData) => {
    try {
        const response = await ApiClient.post(`/users/register`, formData)
        console.log(`UserServices, __CreateUser hits`)
        return response
    } catch (error) {
        console.log(`UserServices, __CreateUser fails`)
        throw error
    }
}
 
export const __GetUser = async (userId) => {
    try {
        const response = await ApiClient.Get(`/users/${userId}`)
        console.log(`UserServices, __GetUser hits`)
        return response
    } catch (error) {
        console.log(`UserServices, __GetUser fails`)
        throw error
    }
}
 
export const __LoginUser = async (formData) => {
    try {
        const response = await ApiClient.post(`/users/login`, formData)
        console.log(`UserServices, __LoginUser hits`)
        localStorage.setItem('token', response.data)
        return response.data
    } catch (error) {
        console.log(`UserServices, __LoginUser fails`)
        throw error
    }
}
 
export const __CheckSession = async () => {
    try {
        const response = await ApiClient.get(`/users/refresh/session`)
        console.log(`UserServices, __CheckSession hits`)
        return response.data
    } catch (error) {
        console.log(`UserServices, __CheckSession fails`)
        throw error
    }
}
 