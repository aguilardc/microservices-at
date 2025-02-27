import yenv from "yenv";

const env = yenv();

export default class {
    static get PORT(): number {
        return process.env.PORT || env.PORT || 3000;
    }

    static get PATH_PRODUCT(): string {
        return process.env.PATH_PRODUCT || env.PATHS.PRODUCT;
    }

    static get PATH_ORDER(): string {
        return process.env.PATH_ORDER || env.PATHS.ORDER;
    }

    static get PATH_PAYMENT(): string {
        return process.env.PATH_PAYMENT || env.PATHS.PAYMENT;
    }
}