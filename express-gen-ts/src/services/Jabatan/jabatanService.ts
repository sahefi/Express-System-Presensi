import { ICreateJabatan } from "@src/models/Jabatan";
import { BadRequest, NotFound } from "@src/other/classes";
import { prisma } from "@src/server";

async function CreateJabatan(req:ICreateJabatan) {
    const find = await prisma.role.findUnique({
        where:{
            id:req.id_role
        }
    })
    if(!find){
        throw new NotFound('Id Not Found')
    }

    const create = await prisma.jabatan.create({
        data:{
            name:req.name,
            id_role:req.id_role
        }
    })
    if(!create){
        throw new BadRequest("Failed Cretaed Data")
    }
    return{
        status:true,
        message:"Succes Create Jabatan",
        data:create
    }
}

export default {
    CreateJabatan
}