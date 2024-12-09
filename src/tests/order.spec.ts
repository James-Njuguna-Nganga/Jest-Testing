import { OrderService } from '../services/order.service';
import { OrderStatus } from '../models/order.interface';

describe('OrderService - Async Tests', () => {
  let orderService: OrderService;

  beforeEach(() => {
    orderService = new OrderService();
  });

  it('should generate multiple orders concurrently', async () => {
    const orders = await orderService.generateMultipleOrders(2);

    expect(orders).toMatchInlineSnapshot(`
[
  {
    "createdAt": 12:15pm,
    "customerEmail": "john@gmail.com",
    "customerName": "john brian",
    "id": "123ee",
    "items": [
      {
        "name": "phone",
        "price": 50000,
        "quantity": 2,
      },
      {
        "name": "cake",
        "price": 1200,
        "quantity": 3,
      }
    ],
    "status": "PROCESSING",
    "totalAmount": 112200,
    "updatedAt": 15:12pm,
  },
`);
  });

  it('should retry processing an order and eventually succeed', async () => {
    const mockUpdateOrderStatus = jest.fn()
      .mockRejectedValueOnce(new Error('Processing failed')) 
      .mockResolvedValueOnce({
        id: 'order1',
        customerName: 'Test Customer',
        totalAmount: 100,
        status: OrderStatus.PROCESSING,
        createdAt: new Date(),
        updatedAt: new Date(),
      });  

    orderService.updateOrderStatus = mockUpdateOrderStatus;

    const result = await orderService.processOrderWithRetry('order1', 3);

    expect(result.status).toBe(OrderStatus.PROCESSING);
    expect(mockUpdateOrderStatus).toHaveBeenCalledTimes(2); 
  });

  
  it('should search orders with filters', async () => {
    const order = await orderService.createOrderAsync(); 

    order.customerName = 'jimmy';
    order.status = OrderStatus.PENDING;
  
    const orders = await orderService.searchOrders({
      status: OrderStatus.PENDING,
      minTotal: 50,
      customerName: 'jimmy',
    });
  
    expect(orders).toHaveLength(1); 
    expect(orders[0].customerName).toBe('jimmy');
  });
  

  it('should fail to process the order after james retries', async () => {
    jest.spyOn(orderService, 'updateOrderStatus').mockRejectedValue(new Error('Processing failed'));

    await expect(orderService.processOrderWithRetry('order1', 3))
      .rejects
      .toThrow('Failed to process order order1 after 3 attempts');
  });
});
