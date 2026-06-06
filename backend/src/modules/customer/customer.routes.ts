import { Router } from "express";
import {getCustomersController,getCustomerProfileController,} from "./customer.controller";
import { validateRequest } from "../../middleware/validateRequest";
import {customerParamsSchema,} from "./customer.validation";

const router = Router();

router.get("/",getCustomersController);
router.get("/:customerId",validateRequest(customerParamsSchema),getCustomerProfileController);

export default router;