import { OrderService } from '../services/order.service';
import { OrderStatus } from '../models/order.interface';

describe('OrderService - Async Tests', () => {
  let orderService: OrderService;

  beforeEach(() => {
    orderService = new OrderService();
  });

  it('should generate multiple orders concurrently', async () => {
    const orders = await orderService.generateMultipleOrders(5);
    
    expect(orders).toHaveLength(5); 
    expect(orders[0].status).toBe(OrderStatus.PENDING);
  });
  

  it('should update order status correctly', async () => {
    const order = await orderService.createOrderAsync(); 
    const updatedOrder = await orderService.updateOrderStatus(order.id, OrderStatus.SHIPPED);

    expect(updatedOrder.status).toBe(OrderStatus.SHIPPED);
    expect(updatedOrder.updatedAt).toBeInstanceOf(Date);
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
