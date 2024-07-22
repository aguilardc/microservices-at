import mongoose, {Schema, Model} from 'mongoose';

class OrderModel {
    private readonly orderScheme: Schema;

    constructor() {
        this.orderScheme = new Schema({
            transactionId: {
                type: String,
                require: true
            },
            status: {
                type: String,
                require: true
            },
            products: {
                type: Array,
                required: true,
                array: [
                    {
                        productId: {
                            type: String,
                            require: true
                        },
                        productCount: {
                            type: Number,
                            require: true
                        },
                    }
                ]
            }
        });
    }

    get model(): Model<any> {
        return mongoose.model("Order", this.orderScheme);
    }
}

export default new OrderModel().model;