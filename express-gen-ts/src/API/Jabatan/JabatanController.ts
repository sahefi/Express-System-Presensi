import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ICreateJabatan, IDeleteJabatan, IListJabatan, IUpdateJabatan } from '@src/models/Jabatan';
import jabatanService from '@src/services/Jabatan/jabatanService';
import { CreateJabatanValidator, UpdateJabatanValidator } from '@src/services/Validations/ValidationService';
import express, { Request, Response } from 'express';
import { requestValidator } from '../BaseController';

const router = express.Router()
router.post("/",CreateJabatanValidator,async(req:Request,res:Response)=>{
    await requestValidator(req,res)
    try {
        const reqDto = req.body as ICreateJabatan
        const createJabatan = await jabatanService.CreateJabatan(reqDto)
        console.log(createJabatan)
        res.status(HttpStatusCodes.OK).send(createJabatan)
    } catch (error) {
        if(error.status){
                res.status(error.status).send({
                    status:false,
                    message:error.message,
                    data:null
                })
        }else{
                res.sendStatus(500).send({
                    status:false,
                    message:error.message,
                    data:null
                })
        }   
        
    }
    
})

router.get('/',async(req:Request,res:Response)=>{
    try {
        const reqDto:IListJabatan = {page:Number(req.query.page),per_page:Number(req.query.per_page)}
        const listJabatan = await jabatanService.ListJabatan(reqDto)
        res.status(HttpStatusCodes.OK).send(listJabatan)
    } catch (error) {
        if(error.status){
            res.status(error.status).send({
                status:false,
                message:error.message,
                data:null
            })
    }else{
            res.sendStatus(500).send({
                status:false,
                message:error.message,
                data:null
            })
    }    
        
    }
})

router.patch('/',UpdateJabatanValidator,async(req:Request,res:Response)=>{
    await requestValidator(req,res)
    try {
        const reqDto = req.body as IUpdateJabatan
        const updateJabatan = await jabatanService.UpdateJabatan(reqDto)
        res.status(HttpStatusCodes.OK).send(updateJabatan)
    } catch (error) {
        if(error.status){
            res.status(error.status).send({
                status:false,
                message:error.message,
                data:null
            })
        }else{
            res.sendStatus(500).send({
                status:false,
                message:error.message,
                data:null
            })
        } 
    }
})

router.delete('/',async(req:Request,res)=>{
    try {
        const reqDto = req.body as IDeleteJabatan
        const deleteJabatan = await jabatanService.DeleteJabatan(reqDto)
        res.status(HttpStatusCodes.OK).send(deleteJabatan)
    } catch (error) {
        if(error.status){
            res.status(error.status).send({
                status:false,
                message:error.message,
                data:null
            })
        }else{
            res.sendStatus(500).send({
                status:false,
                message:error.message,
                data:null
            })
        } 
        
    }
})



export default router 