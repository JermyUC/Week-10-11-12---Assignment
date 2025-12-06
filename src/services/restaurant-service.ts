import { ResponseError } from "../error/response-error";
import { RestaurantModel } from "../models/restaurant-model";
import {
  RestaurantCreateInput,
  RestaurantUpdateInput,
} from "../validations/restaurant-validation";

export const RestaurantService = {
  async create(input: RestaurantCreateInput) {
    return RestaurantModel.create(input);
  },

  async getAll(status?: string) {
    let filter: { isOpen?: boolean } | undefined;

    if (status === "open") {
      filter = { isOpen: true };
    } else if (status === "closed") {
      filter = { isOpen: false };
    }

    return RestaurantModel.findAll(filter);
  },

  async getById(id: number) {
    const restaurant = await RestaurantModel.findById(id);
    if (!restaurant) {
      throw new ResponseError(404, "Restaurant not found");
    }
    return restaurant;
  },

  async update(id: number, input: RestaurantUpdateInput) {
    await RestaurantService.getById(id);
    return RestaurantModel.update(id, input);
  },

  async delete(id: number) {
    await RestaurantService.getById(id);
    await RestaurantModel.delete(id);
  },
};
