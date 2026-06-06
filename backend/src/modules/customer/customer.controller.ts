import { Request, Response } from "express";
import {getCustomersService,getCustomerProfileService,} from "./customer.service";
import { ApiError } from "../../utils/ApiError";


export const getCustomersController = async (req: Request,res: Response) => {
  try {
    const customers = await getCustomersService();
    res.status(200).json({
      success: true,
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:error?.message ||"Failed to fetch customers",
    });
  }
};

export const getCustomerProfileController = async(req: Request,res: Response) => {
  try {
    const customerId = req.params.customerId as string;
    const result =await getCustomerProfileService(  customerId);

    res.status(200).json({
      success: true,
      message:"Customer profile fetched successfully",
      data: result,
    });
  } catch (error: any) {
        if(error.message === "Customer not found"){
            return res.status(404).json({
            success: false,
            message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }   
};