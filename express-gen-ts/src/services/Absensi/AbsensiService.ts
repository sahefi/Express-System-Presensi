import { ICreateAbsensi } from "@src/models/Absensi";
import { BadRequest } from "@src/other/classes";
import { prisma } from "@src/server";
import { DateTime } from "luxon";
import moment from "moment";

async function CreateAbsensi(req:ICreateAbsensi) {
    console.log(req)
    const validateGco = await prisma.gco.findFirst({
        where:{
            name:{
                mode:"insensitive",
                contains:String('Absensi')
            }
        }
    })
    
    const currentTime = DateTime.now().setZone('Asia/Jakarta').toFormat('HH:mm:ss')
    const gcoTimein = moment(validateGco?.time_in).format('HH:mm:ss')
    const gcoTimeout = moment(validateGco?.time_out).format('HH:mm:ss')
   
    const cekTimein= await prisma.presensi.findFirst({
        where:{
            id_staff:req.id_staff,
            time_in:{
                not:null
            },
        }
    })
    const timePresent = DateTime.fromFormat(currentTime,'HH:mm:ss').setZone('Asia/Jakarta').toString()
    if(cekTimein){
        if(currentTime >= gcoTimeout && currentTime <= '19:00:00'){
            await prisma.presensi.update({
                where:{
                    id:cekTimein.id
                },
                data:{
                    id_staff:req.id_staff,
                    time_out:timePresent,
                    latitude:req.latitude,
                    longitude:req.longitude,
                    Status:'late'
                }
            })
            return{
                status:true,
                message:"Anda Sudah Berhasil Checkout ",
                data:null
            }
        }else if(currentTime <= '20:00:00' && currentTime >= '19:00:01'){
            throw new BadRequest('Silahkan Submit Lembur')
        }else if(currentTime < gcoTimeout){
            throw new BadRequest('Belum Melewati Waktu Absen Pulang')
        }else{
            throw new BadRequest('Sudah Melewati Waktu Absen Pulang')
        }
        
    
    }else {
        if(currentTime >= gcoTimein && currentTime <= '10:00:00'){
             await prisma.presensi.create({
                data:{
                    id_staff:req.id_staff,
                    time_in:timePresent,
                    latitude:req.latitude,
                    longitude:req.longitude,
                    Status:'late'
                }
            })
            return{
                status:true,
                message:"anda sudah telat ",
                data:null
            }
        }else if(currentTime <= gcoTimein && currentTime >= '05:00:00' ){
            await prisma.presensi.create({
                data:{
                    id_staff:req.id_staff,
                    time_in:timePresent,
                    latitude:req.latitude,
                    longitude:req.longitude,
                    Status:'on_time'
                }
            })
            return{
                status:true,
                message:"anda tepat waktu",
                data:null
            }
        }else{
            throw new BadRequest('Anda Dipecat')
        }
    }
}

export default {
    CreateAbsensi
}