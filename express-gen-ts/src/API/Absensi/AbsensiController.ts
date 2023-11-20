import { StatusEnum } from '@prisma/client';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ICreateAbsensi, IReportAbsensi } from '@src/models/Absensi';
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

router.get('/',async(req:Request,res:Response)=>{
    try {
        const reqDto:IReportAbsensi = {id:req.query.id as string,staff_name:req.query.staff_name as string,status:req.query.status as StatusEnum}
        const list = await AbsensiService.Report(reqDto)
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


export default router