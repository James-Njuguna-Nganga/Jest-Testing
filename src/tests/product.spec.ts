import { ProductService } from "../services/product.service";

describe('Product Service', () => {
    let productService: ProductService;

    beforeEach(() => {
        productService = new ProductService();
        productService.generateProducts(20);
    });

    it('should generate 20 products', () => {
        const products = productService.getAllProducts();
        expect(products.length).toMatchInlineSnapshot(`20`);
    });
    
    it('should fetch a product by id', () => {
        const product = productService.getAllProducts()[0];
        const fetchedProduct = productService.getProduct(product.id);
        expect(fetchedProduct).toMatchInlineSnapshot(`{
  "category": "electronics",
  "description": "high performance quality",
  "id": "123",
  "name": "woofer",
  "price": 12000,
}
`);
    });
    it('should fetch products by category', () => {
        const products = productService.getAllProducts();
        const category = products[0].category;
        const productsByCategory = productService.getProductsByCategory(category);

        expect(productsByCategory.length).toBeGreaterThan(0);
        productsByCategory.forEach(product => {
            expect(product.category.toLowerCase()).toEqual(category.toLowerCase());
        });
    });

    it('should return an empty array when no products are found in the specified category', () => {
        const productsByCategory = productService.getProductsByCategory('non-existent-category');
        expect(productsByCategory).toMatchInlineSnapshot(`[]`);
    });
});
