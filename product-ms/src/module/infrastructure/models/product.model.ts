import mongoose, {Schema, Model} from 'mongoose';

class ProductModel {
    private readonly productScheme: Schema;

    constructor() {
        this.productScheme = new Schema({
            productName: {
                type: String,
                require: true
            },
            productPrice: {
                type: Number,
                require: true
            },
            productStock: {
                type: Number,
                require: true
            },
        });
    }

    get model(): Model<any> {
        return mongoose.model("Product", this.productScheme);
    }
}

export default new ProductModel().model;