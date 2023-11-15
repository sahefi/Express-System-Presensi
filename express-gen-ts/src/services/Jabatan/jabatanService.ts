import { ICreateJabatan, IDeleteJabatan, IListJabatan, IUpdateJabatan } from "@src/models/Jabatan";
import { IListUser } from "@src/models/User";
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

async function ListJabatan(req:IListJabatan) {
    const page = +req.page ||1
    const take = +req.per_page||10
    const skip = (page-1)*take
    const prevPage = page-1
    const nextPage = page+1

    const list = await prisma.jabatan.findMany({
        select:{
            id:true,
            name:true,
            role:{
                select:{
                    name:true
                    
                }
            },
        },
        orderBy:{
            name:"asc"
        },
        take:take,skip:skip
    })
    const result = list.map((item)=>{
        
        return{
            id:item.id,
            name_jabatan:item.name,
            name_role:item.role?.name
        }
    })

    return{
        page: page,
        per_page: take,
        next_page: nextPage,
        prev_page: prevPage,
        status: true,
        message: 'Success Retrieve Data Jabatan',
        data:result,
    }

}

async function UpdateJabatan(req:IUpdateJabatan) {
    const findJabatan = await prisma.jabatan.findUnique({
        where:{
            id:req.id
        }
    })
    if(!findJabatan){
        throw new NotFound('Id Jabatan Not Found')
    }

    const findRole = await prisma.role.findUnique({
        where:{
            id:req.id_role
        }
    })
    if(!findRole){
        throw new NotFound('Id Role Not Found')
    }

    const update = await prisma.jabatan.update({
        where:{
            id:req.id
        },
        data:{
            name:req.name,
            id_role:req.id_role
        }
    })
    return{
        status: true,
        message: 'Success Retrieve Data Jabatan',
        data:update,
    }
}

async function DeleteJabatan(req:IDeleteJabatan) {
    const find = await prisma.jabatan.findUnique({
        where:{
            id:req.id
        }
    })
    if(!find){
        throw new NotFound("ID Not Found")
    }

    const deleted = await prisma.jabatan.delete({
        where:{
            id:req.id
        }
    })

    return{
        status: true,
        message: 'Success Delete Data Jabatan',
        data:deleted,
    }

    
}


export default {
    CreateJabatan,
    ListJabatan,
    UpdateJabatan,
    DeleteJabatan
}