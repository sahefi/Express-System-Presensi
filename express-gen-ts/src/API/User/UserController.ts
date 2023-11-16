import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ICreateUser, IListUser, ISoftDeleteUser, IUpdateUser } from '@src/models/User';
import UserService from '@src/services/User.ts/UserService';
import express, { Request, Response } from 'express';

const router = express.Router()

router.post('/',async(req:Request,res:Response)=>{
    try {
        const reqDto = req.body as ICreateUser
        const createUser = await UserService.CreateUser(reqDto)
        res.status(HttpStatusCodes.OK).send(createUser)
    } catch (error) {
        if(error.status){
            res.status(error.status).send({
                status:false,
                message:error.message,
                data:null
            })
        }else{
            res.status(500).send({
                status:false,
                message:error.message,
                data:null
            })
        }
    }
})

router.get('/',async(req:Request,res:Response)=>{
    try {
        const reqDto:IListUser = {page:Number(req.query.page),per_page:Number(req.query.per_page)}
        const ListUser = await UserService.ListUser(reqDto)
        res.status(HttpStatusCodes.OK).send(ListUser)
    } catch (error) {
        if(error.status){
            res.status(error.status).send({
                status:false,
                message:error.message,
                data:null
            })
        }else{
            res.status(500).send({
                status:false,
                message:error.message,
                data:null
            })
        }
    }
})

router.patch('/',async(req:Request,res:Response)=>{
    try {
        const reqDto = req.body as IUpdateUser
        const UpdateUser = await UserService.updateUser(reqDto)
        res.status(HttpStatusCodes.OK).send(UpdateUser)

    } catch (error) {
        if(error.status){
            res.status(error.status).send({
                status:false,
                message:error.message,
                data:null
            })
        }else{
            res.status(500).send({
                status:false,
                message:error.message,
                data:null
            })
        }
    }
})

router.delete('/',async(req:Request,res:Response)=>{
    try {
        const reqDto = req.body as ISoftDeleteUser
        const softDeleteUser = await UserService.softDeleteUser(reqDto)
        res.status(HttpStatusCodes.OK).send(softDeleteUser)
    } catch (error) {
        if(error.status){
            res.status(error.status).send({
                status:false,
                message:error.message,
                data:null
            })
        }else{
            res.status(500).send({
                status:false,
                message:error.message,
                data:null
            })
        }
    }
})

export default router