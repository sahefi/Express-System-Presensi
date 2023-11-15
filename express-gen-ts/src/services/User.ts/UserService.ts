import UserRepo from '@src/repos/UserRepo';
import bcrypt from 'bcrypt'
import { ICreateUser, IListUser, IUser } from '@src/models/User';
import { BadRequest, RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { prisma } from '@src/server';
import moment from 'moment';


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
    include:{
      user:true
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
      birth_date : birth_date
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

// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
  CreateUser,
  ListUser
} as const;
