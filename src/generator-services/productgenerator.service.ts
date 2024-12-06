import { faker } from '@faker-js/faker';
import { Product } from "../models/product.interface";
export class ProductGenerator {
    static generateProduct(): Product {
      return {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        category: faker.commerce.department(),
      };
    }
  
    static generateProducts(count: number): Product[] {
      return Array.from({ length: count }, () => this.generateProduct());
    }
  }