import { ILogin } from "@src/models/Auth";
import { BadRequest, NotFound, Unauthorized } from "@src/other/classes";
import { prisma } from "@src/server";
import bcrypt from "bcrypt"
import { NextFunction } from "express";
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import express, { Request, Response } from 'express';
import { token } from "morgan";
import { match } from "assert";

async function Login(req:ILogin) {
    const findUsername = await prisma.staff.findFirst({
        where:{
            user:{
                username:{
                    mode:'insensitive',
                    contains:req.username
                }
            }
        },include:{
            user:true,
            jabatan:{
                include:{
                    role:true
                }
            }
        }
    })
    console.log(findUsername)
    if(!findUsername){
        throw new NotFound ('User Not Found')
    }

    if (findUsername.user?.password) {
        const match = await bcrypt.compare(req.password, findUsername.user.password);
        
        if(match){
            const token = jwt.sign({id:findUsername.id,username:findUsername.user.username,jabatan:findUsername.jabatan?.name,role:findUsername.jabatan?.role?.name},'secret-key',{expiresIn:'1h'})
            return {
                status:true,
                message:"Succes",
                data:token
            }
        }else{
            throw new BadRequest("Email or Password Doesn't Match")
        }
      } 


}

export function verifyJwt(req:Request,res:Response,next: NextFunction) {
    const token = req.header('Authorization') as string
    const secertKey = "secret-key"
    
    try {
        if(!token){
            throw new Unauthorized("Token Tidak Valid")
        }
        const decode:JwtPayload = jwt.verify(token,secertKey,) as JwtPayload
        console.log(decode)
        req.query.user=decode.id
       
        next()
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new BadRequest('Token Has Expired')
        }else {
            throw new BadRequest('Token Error')
        }
        
        
    }
}
export default {
    Login,
}

