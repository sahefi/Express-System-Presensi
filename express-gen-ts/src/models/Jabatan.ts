export interface ICreateJabatan{
   name:string
   id_role:string 
}

export interface IListJabatan{
   page:Number
   per_page:Number
}

export interface IUpdateJabatan{
   id:string
   name:string
   id_role:string
}

export interface IDeleteJabatan{
   id:string
}