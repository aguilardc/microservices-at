import express, {Request, Response} from "express";
import axios, {AxiosRequestConfig} from "axios";
import AppService from "../../../services/app.service";

class Router {
    readonly router: express.Router;

    constructor() {
        this.router = express.Router();
        this.mountRoutes();
    }

    mountRoutes() {
        this.router.get('/products', async (req: Request, res: Response) => {
            const request: AxiosRequestConfig<any> = {
                method: req.method,
                url: AppService.PATH_PRODUCT,
                responseType: "json",
                data: {...req.body},
            };
            try {
                const result = await axios(request);
                res.json(result.data);
            } catch (error) {
                res.json({error});
            }
        });
        this.router.post('/products', async (req: Request, res: Response) => {
            const request: AxiosRequestConfig<any> = {
                method: req.method,
                url: AppService.PATH_PRODUCT,
                responseType: "json",
                data: {...req.body},
            };
            try {
                const result = await axios(request);
                res.json(result.data);
            } catch (error) {
                res.json({error});
            }
        });
        this.router.get('/products/:productId', async (req: Request, res: Response) => {
            const request: AxiosRequestConfig<any> = {
                method: req.method,
                url: `${AppService.PATH_PRODUCT}/${req.params.productId}`,
                responseType: "json",
                data: {...req.body},
            };
            try {
                const result = await axios(request);
                res.json(result.data);
            } catch (error) {
                res.json({error});
            }
        });
        this.router.get('/orders', async (req: Request, res: Response) => {
            const request: AxiosRequestConfig<any> = {
                method: req.method,
                url: AppService.PATH_ORDER,
                responseType: "json",
                data: {...req.body},
            };
            try {
                const result = await axios(request);
                res.json(result.data);
            } catch (error) {
                res.json({error});
            }
        })
        this.router.post('/orders', async (req: Request, res: Response) => {
            const request: AxiosRequestConfig<any> = {
                method: req.method,
                url: AppService.PATH_ORDER,
                responseType: "json",
                data: {...req.body},
            };
            try {
                const result = await axios(request);
                res.json(result.data);
            } catch (error) {
                res.json({error});
            }
        })
        this.router.get('/orders/:orderId', async (req: Request, res: Response) => {
            const request: AxiosRequestConfig<any> = {
                method: req.method,
                url: `${AppService.PATH_ORDER}/${req.params.orderId}`,
                responseType: "json",
                data: {...req.body},
            };
            try {
                const result = await axios(request);
                res.json(result.data);
            } catch (error) {
                res.json({error});
            }
        })
        this.router.post('/payment', async (req: Request, res: Response) => {
            const request: AxiosRequestConfig<any> = {
                method: req.method,
                url: AppService.PATH_PAYMENT,
                responseType: "json",
                data: {...req.body},
            };
            try {
                const result = await axios(request);
                res.json(result.data);
            } catch (error) {
                res.json({error});
            }
        })
    }
}

export default new Router().router;