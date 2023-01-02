import { Router } from "express";
import { createOrder, deleteOrder, getOneOrder, getOrders } from './handlers/order'

const router = Router();

/**
 * Order
 */
router.get("/order", getOrders);
  
  router.get("/order/:id", getOneOrder);
  
  router.post("/order", createOrder);
  
  router.put("/order/:id", (req, res) => {});
  
  router.delete("/order/:id", (req, res) => {});

  export default router;
