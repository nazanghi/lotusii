//I feel like this part is done


import ApiClient from './ApiClient'

export const __GetCards = async (page, limit) => {
    try {
        const response = await ApiClient.get(
            `/mtgcards?page=${page || 1}&${limit || 50 }`
        )
        return response.data
    } catch (error) {throw error}
}

export const __GetSingleCard = async (cardId) => {
    try {
        const response = await ApiClient.get(`/mtgcards/${cardId}`)
        return response.data
    } catch (error) {throw error}
}


