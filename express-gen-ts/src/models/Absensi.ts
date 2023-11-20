import { StatusEnum } from "@prisma/client"

export interface ICreateAbsensi{
    id_staff:string
    longitude:string,
    latitude:string
}

export interface IReportAbsensi{
    id:string
    staff_name:string
    status:StatusEnum

}

