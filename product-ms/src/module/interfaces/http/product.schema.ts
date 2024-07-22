import joi from "joi";

export const productSchema = {
    INSERT: {
        body: joi.object({
            productName: joi.string().required(),
            productPrice: joi.number().required(),
            productStock: joi.number().required(),
        }),
    },
    UPDATE: {
        body: joi.object({
            productName: joi.string().required(),
            productPrice: joi.number().optional(),
            productStock: joi.number().optional(),
        }),
    },
};