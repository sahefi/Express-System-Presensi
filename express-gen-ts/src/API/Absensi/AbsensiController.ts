import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ICreateAbsensi } from '@src/models/Absensi';
import AbsensiService from '@src/services/Absensi/AbsensiService';
import express, { Request, Response } from 'express';


const router = express.Router()

router.post('/',async(req:Request,res:Response)=>{
    try {
    const reqDto = req.body as ICreateAbsensi
    const absen = await AbsensiService.CreateAbsensi(reqDto)
    res.status(HttpStatusCodes.OK).send(absen)
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