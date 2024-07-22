import express from "express";
import Controller from "./controller";
import {ErrorService} from "../../../services/errors.service";
import ValidatorsService from "../../../services/validators.service";
import BrokerInfrastructure from "../../infrastructure/broker.infrastructure";
import PaymentApplication from "../../application/payment.application";
import PaymentInfrastructure from "../../infrastructure/payment.infrastructure";
import {paymentSchema} from "./payment.schema";

const controller = new Controller(new PaymentApplication(new PaymentInfrastructure(new BrokerInfrastructure()), new BrokerInfrastructure()));

class Router {
    readonly router: express.Router;

    constructor() {
        this.router = express.Router();
        this.mountRoutes();
    }

    mountRoutes() {
        this.router.post("/", ValidatorsService.validate(paymentSchema.PAY), ErrorService.catchError(controller.payment));
    }
}

export default new Router().router;