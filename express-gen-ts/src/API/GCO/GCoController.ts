import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ICreateGCO } from '@src/models/GCO';
import GCOService from '@src/services/GCO/GCOService';
import express, { Request, Response } from 'express';

const router = express.Router()

router.post ('/',async(req:Request,res:Response)=>{
    try {
    const reqDto = req.body as ICreateGCO
    console.log(reqDto)
    const createGco = await GCOService.CreateGco(reqDto)
    console.log("masuk",createGco)
    return res.status(HttpStatusCodes.OK).send(createGco)
    } catch (error) {
        
    }
    
})

export default router