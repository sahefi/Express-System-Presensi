import { body } from "express-validator";
//role validator
export const CreateRoleValidator =[
    body('name').notEmpty().withMessage('Name Cannot Be Empty').isString().withMessage('Name Must Be String')
]

export const UpdateRoleValidator =[
    body('id').notEmpty().withMessage('ID Cannot Be Empty').isString().withMessage('ID Must Be String'),
    body('name').notEmpty().withMessage('Name Cannot Be Empty').isString().withMessage('Name Must Be String')
]

export const SoftDeleteRoleValidator =[
    body('id').notEmpty().withMessage('ID Cannot Be Empty').isString().withMessage('ID Must Be String')
]

//jabatanvalidator

export const CreateJabatanValidator =[
    body('name').notEmpty().withMessage('Name Cannot Be Empty').isString().withMessage('Name Must Be String'),
    body('id_role').notEmpty().withMessage('ID_Role Cannot Be Empty').isString().withMessage('id_role Must Be String')
]

export const UpdateJabatanValidator =[
    body('id').notEmpty().withMessage('ID Cannot Be Empty').isString().withMessage('ID Must Be String'),
    body('name').notEmpty().withMessage('Name Cannot Be Empty').isString().withMessage('Name Must Be String'),
    body('id_role').notEmpty().withMessage('ID_Role Cannot Be Empty').isString().withMessage('ID_Role Must Be String'),
]

export const DeleteJabatanValidator =[
    body('id').notEmpty().withMessage('ID Cannot Be Empty').isString().withMessage('ID Must Be String')
]