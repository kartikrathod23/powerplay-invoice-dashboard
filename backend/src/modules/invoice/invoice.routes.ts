import { Router } from "express";
import {getInvoicesController,createInvoiceController,updateInvoiceController} from "./invoice.controller";
import {validateRequest,} from "../../middleware/validateRequest";
import {getInvoicesSchema,createInvoiceSchema,updateInvoiceSchema} from "./invoice.validation";

const router = Router();

router.get("/",validateRequest(getInvoicesSchema),getInvoicesController);
router.post("/",validateRequest(createInvoiceSchema),createInvoiceController);
router.put("/:invoiceId",validateRequest(updateInvoiceSchema),updateInvoiceController);

export default router;