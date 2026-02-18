import z, { ZodType } from 'zod';
import { loginSchema } from './Fields/Login/Schema';
import { passwordSchema } from './Fields/Password/Schema';
import { EFormType } from './Enums';

/** 
 * Функция получения схемы валидации формы авторизации. 
 * 
 * @param formType Тип формы.
 */
export function getAuthFormSchema (formType: Optional<EFormType>): ZodType {

    return z.object({
        login: loginSchema,
        password: formType === EFormType.RESTORE_PASSWORD ? z.undefined() : passwordSchema
    })
}