import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ICreateJabatan } from '@src/models/Jabatan';
import jabatanService from '@src/services/Jabatan/jabatanService';
import express, { Request, Response } from 'express';

const router = express.Router()
router.post("/",async(req:Request,res:Response)=>{
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

export default router 