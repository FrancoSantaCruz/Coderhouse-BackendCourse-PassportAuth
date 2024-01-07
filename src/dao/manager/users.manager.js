import { userModel } from "../models/users.model.js";
import Manager from "./manager.js";

class UsersManager extends Manager{
    constructor(){
        super(userModel)
    }

    async findByField(obj){
        const res = await this.model.findOne(obj).lean()
        return res
    }

    async findByEmail(email){
        const res = await this.model.findOne({email})
        return res
    }
}

export const userManager = new UsersManager();