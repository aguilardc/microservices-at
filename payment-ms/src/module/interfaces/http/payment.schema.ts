import joi from "joi";

export const paymentSchema = {
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