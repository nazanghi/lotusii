import ApiClient from './ApiClient'

export const __CreateComment = (formData, deckId, userId) => {
    try {
        const response = await ApiClient.post(`/comments/${deckId}/${userId}`, formData)        
        console.log(
            `CommentServices, __CreateComment hits.
            userId: ${userId}
            deckId: ${deckId}
            formData: ${formData}`)
        return response.data
    } catch (error) {
        console.log('CommentServices, __CreateComment fails')
        throw error
    }
}

export const __EditComment = (commentId, formData) => {
    try {
        const response = await ApiClient.put(`/comments/${commentId}`, formData)        
        console.log('CommentServices, __EditComment hits')
        return response.data
    } catch (error) {
        console.log('CommentServices, __EditComment fails')
        throw error
    }
}

export const __RemoveComment = (commentId) => {
    try {
        const response = await ApiClient.delete(`/comments/${commentId}`)        
        console.log('CommentServices, __RemoveComment hits')
        return response.data
    } catch (error) {
        console.log('CommentServices, __RemoveComment fails')
        throw error
    }
}
