import z from 'zod';
import { attachmentsSchema } from './Fields/Attachments/Schema';
import { titleSchema } from './Fields/CaseTitle/Schema';
import { commentSchema } from './Fields/Comment/Schema';
import { expectionSchema } from './Fields/Expection/Schema';
import { postConditionchema } from './Fields/PostCondition/Schema';
import { preConditionSchema } from './Fields/PreCondition/Schema';
import { resultSchema } from './Fields/Result/Schema';
import { stepsSchema } from './Fields/Steps/Schema';
import { descriptionSchema } from './Fields/Description/Schema';

/** Схема валидации формы тест-кейса. */
export const casesFormSchema = z.object({
    attachments: attachmentsSchema,
    description: descriptionSchema,
    title: titleSchema,
    comment: commentSchema,
    expected: expectionSchema,
    postCondition: postConditionchema,
    preCondition: preConditionSchema,
    result: resultSchema,
    steps: stepsSchema,
})