const { Comment, Deck } = require('../database/schema')


const CreateComment = async (request, response) => {
    try{
        const comment = new Comment({ ...request.body, user_id: request.params.user_id })
        comment.save()
        await Deck.update(
            { _id: request.params.deck_id },
            {
                $push: {
                    comments: comment
                }
            }
        )
        console.log('CommentController: CreateComment hits')
        response.send(comment)
    } catch (error) {
        console.log('CommentController: CreateComment fails')
        throw error
    }
}
 
const EditComment = async (request, response) => {
    try{
        await Comment.findByIdAndUpdate(
            request.params.comment_id,
            { ...request.body },
            { upsert: true, new: true },
            (error, d) => (error ? error : response.send(d))
        )
        console.log('CommentController: EditComment hits')
    } catch (error) {
        console.log('CommentController: EditComment fails')
        throw error
    }
}
 
const DeleteComment = async (request, response) => {
    try{
        await Comment.deleteOne({ _id: request.params.comment_id })
        const updatedDeck = await Deck.findByIdAndUpdate(
                request.params.deck_id,
                { $pull: { comments: { _id: request.params.comment_id } } },
                { upsert: true, new: true }        
            )
        console.log('CommentController: DeleteComment hits')
        response.send(updatedDeck)
    } catch (error) {
        console.log('CommentController: DeleteComment fails')
        throw error
    }
}
 
module.exports = {
    CreateComment,
    EditComment,
    DeleteComment
}
