import {Request, Response} from "express";
import PaymentApplication from "../../application/payment.application";

export default class Controller {
    _application: PaymentApplication;

    constructor(readonly application: PaymentApplication) {
        this._application = application;
        this.payment = this.payment.bind(this);
    }

    async payment(req: Request, res: Response): Promise<void> {
        const result = await this._application.payment(req.body);
        res.send(result);
    }
}