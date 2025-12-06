import { Request, Response } from "express";
import { OrderService } from "../services/order-service";
import { validateOrderCreate } from "../validations/order-validation";

export const OrderController = {
  create: async (req: Request, res: Response) => {
    const input = validateOrderCreate(req.body);
    const order = await OrderService.create(input);
    res.status(201).json(order);
  },

  getAll: async (req: Request, res: Response) => {
    const customerId = req.query.customerId
      ? Number(req.query.customerId)
      : undefined;
    const restaurantId = req.query.restaurantId
      ? Number(req.query.restaurantId)
      : undefined;

    const orders = await OrderService.getAll({ customerId, restaurantId });
    res.json(orders);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const order = await OrderService.getById(id);
    res.json(order);
  },
};
