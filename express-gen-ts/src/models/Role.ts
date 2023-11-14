export interface ICreateRole {
    name:string
}

export interface IListRole{
    page:Number
    per_page:Number
}

export interface IUpdateRole{
    id:string
    name:string
}

export interface ISoftDeleteRole{
    id:string
}