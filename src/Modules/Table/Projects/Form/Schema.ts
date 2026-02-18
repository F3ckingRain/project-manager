import z from 'zod';
import { projectNameSchema } from './Fields/ProjectName/Schema';
import { clientSchema } from './Fields/Client/Schema';
import { executorsSchema } from './Fields/Executors/Schema';
import { documentsSchema } from './Fields/Documents/Schema';
import { descriptionSchema } from './Fields/Description/Schema';

/** Схема валидации формы проета. */
export const projectFormSchema = z.object({
    name: projectNameSchema,
    client: clientSchema,
    executors: executorsSchema,
    documents: documentsSchema,
    description: descriptionSchema,
})