import { ICreateRole, IListRole, ISoftDeleteRole, IUpdateRole } from '@src/models/Role';
import RoleService from '@src/services/Role/RoleService';
import { CreateRoleValidator, SoftDeleteRoleValidator, UpdateRoleValidator } from '@src/services/Validations/ValidationService';
import express, { Request, Response } from 'express';
import { requestValidator } from '../BaseController';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

const router = express.Router()

router.post('/',CreateRoleValidator,async(req:Request,res:Response)=>{
    await requestValidator(req,res)
    try {
        const reqDto = req.body as ICreateRole
        const createRole = await RoleService.CreateRole(reqDto)
        res.status(200).send(createRole)    
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
        const reqDto : IListRole = {page:Number(req.query.page),per_page:Number(req.query.per_page)}
        const list = await RoleService.listRole(reqDto)
        res.status(HttpStatusCodes.OK).send(list)
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

router.patch('/',UpdateRoleValidator,async(req:Request,res:Response)=>{
    await requestValidator(req,res)
    try {
        const reqDto = req.body as IUpdateRole
        const updateRole = await RoleService.UpdateRole(reqDto)
        res.status(HttpStatusCodes.OK).send(updateRole)
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

router.delete('/',SoftDeleteRoleValidator,async(req:Request,res:Response)=>{
    await requestValidator(req,res)
    try {
        const reqDto = req.body as ISoftDeleteRole
        const softDelete = await RoleService.SoftDeletRole(reqDto)
        res.status(HttpStatusCodes.OK).send(softDelete)
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