import { Router } from "express";
import { createOrder, deleteOrder, getOneOrder,updateOrder, getOrders } from './handlers/order'

const router = Router();

router.get("/order",getOrders);
  
  router.get("/order/:id", getOneOrder);
  
  router.post("/order", createOrder);
  
  router.put("/order/:id", updateOrder);
  
  router.delete("/order/:id", deleteOrder);

  export default router;
