export interface ICreateGCO{
    name:string,
    time_in:string,
    time_out:string,
    longitude:string,
    latitude:string
}

export interface IUpdateGCO{
    id:string
    name:string,
    time_in:string,
    time_out:string,
    longitude:string,
    latitude:string
}