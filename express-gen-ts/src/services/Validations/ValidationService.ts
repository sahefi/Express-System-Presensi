import { body } from "express-validator";

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