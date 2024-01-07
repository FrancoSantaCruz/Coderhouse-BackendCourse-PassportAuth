import {messagesModel} from '../models/messages.model.js'

class MessagesManager {
    async findAll(){
        return messagesModel.find().lean()
    }
    async findByID(id){
        return messagesModel.findById({_id: id}).populate('chats.autor').lean()
    }
    async createOne(obj){
        return messagesModel.create(obj)
    }
    async updateOne(id, obj){
        return messagesModel.updateOne({_id: id}, obj)
    }
    async deleteOne(id){
        return messagesModel.deleteOne({_id: id})
    }
    async findByField(obj){
        const res = await messagesModel.findOne(obj).populate('chats.autor').lean()
        return res
    }
}

export const messagesManager = new MessagesManager();

