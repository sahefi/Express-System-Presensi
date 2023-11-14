import { ICreateRole, IListRole, ISoftDeleteRole, IUpdateRole } from "@src/models/Role";
import { BadRequest, NotFound } from "@src/other/classes";
import { prisma } from "@src/server";

async function CreateRole(req:ICreateRole) {
    const find = await prisma.role.findUnique({
        where:{
            name:req.name
        }
    }) 
    if(find){
        throw new BadRequest ("Role Is Already Exist")
    }
    
    const create = await prisma.role.create({
        data:{
            name:req.name
        }
    })
    if(!create){
        throw new Error ('Failed Create Data')
    }
    return{
        status: true,
        message: 'Success Create Data Role',
        data:create,
    }
}

async function listRole(req:IListRole) {
    const page = +req.page ||1
    const take = +req.per_page || 10
    const skip = (page-1) * take
    const nextPage = page+1
    const prevPage = page-1

    const list = await prisma.role.findMany({
        skip:skip,take:take,
        where:{
            deleted_at:null
        },
        orderBy:{
            name:"asc"
        },
        select:{
            id:true,
            name:true
        }
    })
    return{
        page: page,
        per_page: take,
        next_page: nextPage,
        prev_page: prevPage,
        status: true,
        message: 'Success Retrieve Data Role',
        data:list,
    }
}

async function UpdateRole(req:IUpdateRole) {
   const find = await prisma.role.findUnique({
    where:{
        id:req.id
    }
   })
   if(!find){
    throw new NotFound('Id Not Found')
   }

   const update = await prisma.role.update({
    where:{
        id:req.id
    },
    data:{
        name:req.name
    }
   })

   return{
        status: true,
        message: 'Success Update Data Role',
        data:update,
   }
    
}

async function SoftDeletRole(req:ISoftDeleteRole) {
    const now = new Date ()
    const find = await prisma.role.findUnique({
        where:{
            id:req.id
        }
    })
    if(!find){
        throw new NotFound("Id Not Found")
    }
    if(find.deleted_at !== null){
        throw new BadRequest ("Data Is already Deleted")
    }
    const softDelete = await prisma.role.update({
        where:{
            id:req.id
        },
        data:{
            deleted_at:now
        }
    })
    return{
        status: true,
        message: 'Succes Deleted Role',
        data:softDelete,
    }
    
}

export default{
    CreateRole,
    listRole,
    UpdateRole,
    SoftDeletRole
}