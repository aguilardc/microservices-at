import joi from "joi";

export const orderSchema = {
    INSERT: {
        body: joi.object({
            transactionId: joi.string().min(10).max(50).required(),
            status: joi.string().required(),
            products: joi.array().items({
                productId: joi.string().required(),
                productCount: joi.number().required(),
            }).required().min(1)
        }),
    },
    PAY: {
        body: joi.object({
            id: joi.string().min(10).max(50).required(),
            transactionId: joi.string().min(10).max(50).required(),
            products: joi.array().items({
                productId: joi.string().required(),
                productCount: joi.number().required(),
            }).required().min(1)
        }),
    },
};