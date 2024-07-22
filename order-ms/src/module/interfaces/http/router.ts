import express from "express";
import Controller from "./controller";
import OrderApplication from "../../application/order.application";
import OrderInfrastructure from "../../infrastructure/order.infrastructure";
import {ErrorService} from "../../../services/errors.service";
import ValidatorsService from "../../../services/validators.service";
import {orderSchema} from "./order.schema";
import BrokerInfrastructure from "../../infrastructure/broker.infrastructure";

const controller = new Controller(new OrderApplication(new OrderInfrastructure(), new BrokerInfrastructure(new OrderInfrastructure())));

class Router {
    readonly router: express.Router;

    constructor() {
        this.router = express.Router();
        this.mountRoutes();
    }

    mountRoutes() {
        this.router.get("/", ErrorService.catchError(controller.listAll));
        this.router.post("/", ValidatorsService.validate(orderSchema.INSERT), ErrorService.catchError(controller.insert));
        this.router.get("/:orderId", ErrorService.catchError(controller.findById));
    }
}

export default new Router().router;