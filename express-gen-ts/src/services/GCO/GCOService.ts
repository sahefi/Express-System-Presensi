import { ICreateGCO, IUpdateGCO } from "@src/models/GCO";
import { NotFound } from "@src/other/classes";
import { prisma } from "@src/server";
import {DateTime} from "luxon"

async function CreateGco(req:ICreateGCO) {
    
    // req.time_in = moment(req.time_in,'HH:mm:ss','Asia/Jakarta').utc().format()
    // req.time_out = moment(req.time_out,'HH:mm:ss').toISOString()
    let time_in = DateTime.fromFormat(req.time_in,'HH:mm:ss').setZone('Asia/Jakarta').toString()
    let time_out = DateTime.fromFormat(req.time_out,'HH:mm:ss').setZone('Asia/Jakarta').toString()
    
    try {
        const create = await prisma.gco.create({
            data:{
                name:req.name,
                longitude:req.longitude,
                latitude:req.latitude,
                time_in:time_in,
                time_out:time_out
    
            }
        })
        return{
            status:true,
            message:true,
            data:create
            
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

async function UpdateGco(req:IUpdateGCO) {
    let time_in = DateTime.fromFormat(req.time_in,'HH:mm:ss').setZone('Asia/Jakarta').toString()
    let time_out = DateTime.fromFormat(req.time_out,'HH:mm:ss').setZone('Asia/Jakarta').toString()
    try {
        const find = await prisma.gco.findUnique({
            where:{
                id:req.id
            }
        })
        if(!find){
            throw new NotFound('Id Not Found')
        }
    
        const update = await prisma.gco.update({
            where:{
                id:req.id
            },
            data:{
                name:req.name,
                time_in:time_in,
                time_out:time_out,
                latitude:req.latitude,
                longitude:req.longitude
            }
        })
        return{
            status:true,
            message:true,
            data:update
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export default{
    CreateGco,
    UpdateGco
}