
export default class Manager {
    constructor(model){
        this.model = model
    }
    async findAll(){
        return this.model.find().lean()
    }
    async findByID(id){
        return this.model.findById({_id: id}).lean()
    }
    async createOne(obj){
        return this.model.create(obj)
    }
    async updateOne(id, obj){
        return this.model.updateOne({_id: id}, obj)
    }
    async deleteOne(id){
        return this.model.deleteOne({_id: id})
    }
}

