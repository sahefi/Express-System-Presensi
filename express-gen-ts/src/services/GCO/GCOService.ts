import { ICreateGCO } from "@src/models/GCO";
import { prisma } from "@src/server";
import moment from "moment";
import {DateTime} from "luxon"

async function CreateGco(req:ICreateGCO) {
    console.log("bla")
    console.log(req.time_in)
    // req.time_in = moment(req.time_in,'HH:mm:ss','Asia/Jakarta').utc().format()
    // req.time_out = moment(req.time_out,'HH:mm:ss').toISOString()
    let time_in = DateTime.fromFormat(req.time_in,'HH:mm:ss').setZone('Asia/Jakarta').toString()
    let time_out = DateTime.fromFormat(req.time_out,'HH:mm:ss').setZone('Asia/Jakarta').toString()
    console.log(time_in)
    console.log(time_out)
    
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

export default{
    CreateGco
}