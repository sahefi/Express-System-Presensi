import UserRepo from '@src/repos/UserRepo';
import bcrypt from 'bcrypt'
import User, { ICreateUser, IListUser, ISoftDeleteUser, IUpdateUser, IUser } from '@src/models/User';
import { BadRequest, NotFound, RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { prisma } from '@src/server';
import moment, { now } from 'moment';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IUser[]> {
  return UserRepo.getAll();
}

/**
 * Add one user.
 */
function addOne(user: IUser): Promise<void> {
  return UserRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(user: IUser): Promise<void> {
  const persists = await UserRepo.persists(user.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return UserRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return UserRepo.delete(id);
}

async function CreateUser(req:ICreateUser) {
  const findUsername = await prisma.user.findUnique({
    where:{
      username:req.username
    }
  })
  if(findUsername){
    throw new BadRequest('Username Is Already Exist')
  }

  const findEmail = await prisma.staff.findUnique({
    where:{
      email:req.email
    }
  })
  if(findEmail){
    throw new BadRequest('Email Is Already Exist')
  }

  const result= await prisma.$transaction(async (tx)=> {
    const hashed = await bcrypt.hash(req.password,10)
    const createUser = await tx.user.create({
      data:{
        username:req.username,
        password:hashed
  
      }
    })
    const birth_date = moment(req.birth_date,'DD-MM-YYYY').toDate()
    const createStaff = await tx.staff.create({
      data:{
        name:req.name,
        email:req.email,
        birth_date:birth_date,
        id_jabatan:req.id_jabatan,
        id_user:createUser.id
      },
      include:{
        jabatan:true
      }
    })
    return{
      data:{
        status:true,
        message:"Succes Add User",
        id_user:createUser.id,
        id_staff: createStaff.id,
        email: createStaff.email,
        birth_date: moment(createStaff.birth_date).format('DD-MM-YYYY'),
        jabatan: createStaff.jabatan?.name
      }
    }
  })

  return{
    data: result
  }

  
}

async function ListUser(req:IListUser) {
  const page = +req.page || 1
  const take = +req.per_page || 10
  const skip = (page-1) * take
  const prevPage = page - 1
  const nextPage = page + 1
  
  const list = await prisma.staff.findMany({
    where:{
      user:{
        deleted_at:null
      }
    },
    include:{
      user:true,
      jabatan:true
    },
    orderBy:{
      user:{
        username:"asc"
      }
    },
      take:take,skip:skip
  })

  const result = list.map((item)=>{
    const birth_date = moment(item.birth_date).format('DD-MM-YYYY')
    
    return{
      id_user:item.user?.id,
      id_staff:item.id,
      name:item.name,
      username:item.user?.username, 
      email:item.email,
      birth_date : birth_date,
      name_jabatan : item.jabatan?.name || null
    }
  })

  return{
    page: page,
    per_page: take,
    next_page: nextPage,
    prev_page: prevPage,
    status:true,
    message:"Succes Get List User",
    data : result
  }
}

  async function updateUser(req:IUpdateUser) {
    // const findUsername = await prisma.user.findFirst({
    //   where:{
    //     username:req.username
    //   }
    // })
    // if(findUsername){
    //   throw new BadRequest('Username Is Already Exist')
    // }
  
    // const findEmail = await prisma.staff.findFirst({
    //   where:{
    //     email:req.email
    //   }
    // })
    // if(findEmail){
    //   throw new BadRequest('Email Is Already Exist')
    // }
    
   
    
    
    const result = await prisma.$transaction(async(tx)=>{
      const findStaff = await prisma.staff.findUnique({
        where:{
          id:req.id_staff
        },
        include:{
          user:true
        }
      }) 
  
      if(!findStaff){
        throw new NotFound('Staff ID Not Found')
      }
      else if(!findStaff.id_user){
        throw new NotFound('User Id Not Found In Staff')
      }
  
    
      const birth_date = moment(req.birth_date,'DD-MM-YYYY').toDate()
      const updateStaff = await tx.staff.update({
        where:{
          id:req.id_staff
        },
        data:{
          name:req.name,
          email:req.email,
          birth_date:birth_date,
          id_jabatan:req.id_jabatan
        },
        include:{
          jabatan:true
        }
      })

      const updateUser = await tx.user.update({
        where:{
          id:updateStaff.id_user||undefined
        },
        data:{
          username:req.username
        }
      })
      return{
        status:true,
        message:"Succes Add User",
        username:updateUser.username,
        name:updateStaff.name,
        birth_date:moment(updateStaff.birth_date).format('DD-MM-YYYY'),
        email:updateStaff.email,
        id_jabatan:updateStaff.id_jabatan
      }
    })
    return{
      data:result
    }
    }

    async function softDeleteUser(req:ISoftDeleteUser) {

      const result = await prisma.$transaction(async(tx)=>{
        const now = new Date()
      const find = await prisma.user.findUnique({
        where:{
          id:req.id
        }
      })

      if(!find){
        throw new NotFound('ID Not Found')
      }

      if(find.deleted_at != null){
        throw new BadRequest('User Already Deleted')
      }
      const softDelete = await prisma.user.update({
        where:{
          id:req.id
        },
        data:{
          deleted_at:now,
        }

    })
    if(softDelete){
      const softDeleteStaff = await prisma.staff.updateMany({
        where:{
          id_user:softDelete.id
        },
        data:{
          deleted_at:now
        }
        })
      }
      return{
        status:true,
        message:"Succes Delete User",
        data:null
      }
    })
      

      
      return{
        data:result
      }
    }
  

// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
  CreateUser,
  ListUser,
  updateUser,
  softDeleteUser
} as const;
