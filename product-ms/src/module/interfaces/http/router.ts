import express from "express";
import Controller from "./controller";
import ProductApplication from "../../application/product.application";
import ProductInfrastructure from "../../infrastructure/product.infrastructure";
import {ErrorService} from "../../../services/errors.service";
import ValidatorsService from "../../../services/validators.service";
import {productSchema} from "./product.schema";
import BrokerInfrastructure from "../../infrastructure/broker.infrastructure";

const controller = new Controller(new ProductApplication(new ProductInfrastructure(), new BrokerInfrastructure(new ProductInfrastructure())));

class Router {
    readonly router: express.Router;

    constructor() {
        this.router = express.Router();
        this.mountRoutes();
    }

    mountRoutes() {
        this.router.get("/", controller.listAll);
        this.router.get("/:productId", controller.listById);
        this.router.post("/", ValidatorsService.validate(productSchema.INSERT), ErrorService.catchError(controller.insert));
        this.router.put("/:productId", ValidatorsService.validate(productSchema.UPDATE), ErrorService.catchError(controller.update));
    }
}

export default new Router().router;