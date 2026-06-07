import { Request, Response } from "express";
import { getInvoicesService,createInvoiceService,updateInvoiceService,getInvoiceByIdService } from "./invoice.service";

export const getInvoicesController = async(req: Request,res: Response):Promise<void> =>{
  try{
    const result = await getInvoicesService(req.query as any);

    res.status(200).json({
      success: true,
      message: "Invoices fetched successfully",
      data: result.invoices,
      pagination: result.pagination,
    });
  } catch (error){
    const message =error instanceof Error? error.message: "Internal Server Error";
    res.status(500).json({
      success: false,
      message,
    });
  }
};


export const createInvoiceController =async (req: Request,res: Response) => {
    try{
      const invoice =await createInvoiceService(req.body );
      res.status(201).json({
        success: true,
        message:"Invoice created successfully",
        data: invoice,
      });
    } catch (error: any){
      res.status(error.statusCode || 500).json({
        success: false,
        message:error.message ||"Failed to create invoice",
      });
    }
};


export const updateInvoiceController =async (req: Request,res: Response)=>{
    try{
      const invoice =await updateInvoiceService(req.params.invoiceId as string,req.body);
      res.status(200).json({
        success: true,
        message:"Invoice updated successfully",
        data: invoice,
      });
    } catch (error: any){
      res.status( error.statusCode || 500).json({
        success: false,
        message:error.message ||"Failed to update invoice",
      });
    }
};



export const getInvoiceByIdController =async (req: Request,res: Response): Promise<void> => {
    try{
      const invoice = await getInvoiceByIdService(req.params.invoiceId as string);

      res.status(200).json({
        success: true,
        message:"Invoice fetched successfully",
        data: invoice,
      });
    }catch (error: any){
      res.status(error.statusCode || 500).json({
          success: false,
          message: error.message || "Failed to fetch invoice",
      });
    }
};