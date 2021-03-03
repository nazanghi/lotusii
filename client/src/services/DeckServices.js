import ApiClient from './ApiClient'

export const __CreateDeck = async (formData, userId) => {
    try {
        const response = await ApiClient.post(`/decks/${userId}/?active=true`, formData)
        console.log('DeckServices: __CreateDeck hits. Response: ', response)
        return response.data
    } catch (error) {
        console.log('DeckServices: __CreateDeck fails')
        throw error
    }
}
 
export const __GetOneDeck = async (deckId) => {
    try {
        const response = await ApiClient.get(`decks/${deckId}`)
        console.log('DeckServices: __GetDeck hits. Response: ', response)
        return response.data
    } catch (error) {
        console.log('DeckServices: __GetDeck fails')
        throw error
    }
}
 
export const __GetDecks = async (page, limit) => {
    try {
        const response = await ApiClient.get(
            `/decks/?page=${ page || 1 }&limit=${ limit || 10 }`
        )
        console.log('DeckServices: __GetAllDecks hits')
        return response.data
    } catch (error) {
        console.log('DeckServices: __.Deck fails')
        throw error
    }
}
export const __UpdateDeckInfo = async (deckId, formData) => {
    try {
        const response = await ApiClient.put(
            `/decks/${deckId}?active=true`, formData
        )
        console.log('DeckServices: __UpdateDeckInfo hits')
        return response
    } catch (error) {
        console.log('DeckServices: __UpdateDeckInfo fails')
        throw error
    }
}
export const __DeleteDeck = async (deckId) => {
    try {
        const response = await ApiClient.delete(`/decks${deckId}/?active=true`)
        console.log('DeckServices: __DeleteDeck hits')
        return response
    } catch (error) {
        console.log('DeckServices: __DeleteDeck fails')
        throw error
    }
}


/**
 * //TODO
 *need to add AddCard and RemoveCard once this is all tested up. 
 *   */ 