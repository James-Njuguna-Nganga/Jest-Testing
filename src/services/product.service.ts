import { Product } from "../models/product.interface";
import { ProductGenerator } from "../generator-services/productgenerator.service";

export class ProductService {
    private products: Product[] = [];

    generateProducts(count: number = 20): void {
        this.products = ProductGenerator.generateProducts(count);
    }

    getAllProducts(): Product[] {
        return this.products;
    }

    getProduct(id: string): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    getProductsByCategory(category: string): Product[] {
        return this.products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }
}