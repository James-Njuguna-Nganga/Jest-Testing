import { Order,OrderStatus, OrderItem } from "../models/order.interface";
import { faker } from "@faker-js/faker/.";

export class OrderGenerator {
    static generateOrderItem(): OrderItem {
      return {
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 5 }),
        price: parseFloat(faker.commerce.price())
      };
    }
  
    static generateOrder(): Order {
      const items = Array.from(
        { length: faker.number.int({ min: 1, max: 3 }) }, 
        () => this.generateOrderItem()
      );
  
      return {
        id: faker.string.uuid(),
        customerName: faker.person.fullName(),
        customerEmail: faker.internet.email(),
        items,
        totalAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: faker.helpers.enumValue(OrderStatus),
        createdAt: faker.date.past(),
        updatedAt: new Date()
      };
    }
  }