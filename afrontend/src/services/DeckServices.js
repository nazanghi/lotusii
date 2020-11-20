//Need to make 
//      __StoreCardInDeck
//      __RemoveCardFromDeck



import ApiClient from './ApiClient'

export const __GetDecks = async (page, limit) => {
    try {
        const response= await ApiClient.get(
            `/decks?page=${page ||1}&limit=${limit || 10 }`
        )
        return response.data
    } catch (error) {throw error}
}

export const __GetSingleDeck = async (deckId) => {
    try {
        const response = await ApiClient.get(`/decks/${deckId}`)
        console.log(`__GetSingleDeck`, response.data)
        return response.data
    } catch (error) {throw error}
}

export const __DeleteDeck = async (deckId) => {
    try {
        const response = await ApiClient.delete(`/decks/${deckId}?active=true`)
        return response.data
    } catch (error) {throw error}
}

export const __UpdateDeckInfo = async (formData, deckId) => {
    try {
        const response = await ApiClient.put(`/decks/${deckId}?active=true`, formData)
        console.log(response.data)
        return response.data
    } catch (error){throw error}
}

export const __CreateDeck = async (formData, userId) => {
    try {
        const response = await ApiClient.post(`/decks/${userId}/?active=true`, formData)
        return response.data
    } catch (error){throw error}
}

export const __AddCardToDeck = async (deckId, cardId) => {
    try {
        const response = await ApiClient.put(`/${deckId}/${cardId}`)
        return response.data
    } catch(error){throw error}  
}

export const __RemoveCardFromDeck = async (deckId, cardId) => {
    try {
        const response = await ApiClient.delete(`/${deckId}/${cardId}`)
    } catch(error){throw error}
}

// export const __AddCardToDeck = async (MTGCardId, deckId)




    // export const __UpdateDecksCards = async (cardId, deckId) => {
    //     try {
    //         const foundCard = await ApiClient.get(`/mtgcards/${cardId}`)
    //         const response = await ApiClient.put(`/decks/${deckId}/${foundCard}`)
    //         console.log(response.data)
    //         return response.data
    //     } catch (error){throw error}
    // }