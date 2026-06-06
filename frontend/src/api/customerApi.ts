import {api,} from "./client";

export const getCustomers = async () =>{
  const response = await api.get("/customers");
  return response.data;
};

export const getCustomerProfile = async(customerId: string) => {
  const response = await api.get(`/customers/${customerId}`);
  return response.data;
};