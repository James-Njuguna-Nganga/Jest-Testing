import { Order, OrderItem, OrderStatus } from "../models/order.interface";
import { OrderGenerator } from "../generator-services/ordergenerator.service";

export class OrderService {
    private orders: Order[] = [];
  
    // Async order generation with delay
    async createOrderAsync(delay: number = 500): Promise<Order> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const order = OrderGenerator.generateOrder();
          this.orders.push(order);
          resolve(order);
        }, delay);
      });
    }
  
    // Generate multiple orders concurrently
    async generateMultipleOrders(count: number): Promise<Order[]> {
      const orderPromises = Array.from({ length: count }, () => 
        this.createOrderAsync(Math.random() * 1000)
      );
      return Promise.all(orderPromises);
    }
  
    // Async order status update
    async updateOrderStatus(
      orderId: string, 
      newStatus: OrderStatus
    ): Promise<Order> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const orderIndex = this.orders.findIndex(o => o.id === orderId);
          
          if (orderIndex === -1) {
            reject(new Error('Order not found'));
            return;
          }
  
          this.orders[orderIndex] = {
            ...this.orders[orderIndex],
            status: newStatus,
            updatedAt: new Date()
          };
  
          resolve(this.orders[orderIndex]);
        }, 300);
      });
    }
  
    // Search orders with complex filtering
    async searchOrders(
      filters: {
        status?: OrderStatus, 
        minTotal?: number, 
        customerName?: string
      }
    ): Promise<Order[]> {
      return new Promise((resolve) => {
        setTimeout(() => {
          const filteredOrders = this.orders.filter(order => {
            const statusMatch = !filters.status || order.status === filters.status;
            const totalMatch = !filters.minTotal || order.totalAmount >= filters.minTotal;
            const nameMatch = !filters.customerName || 
              order.customerName.toLowerCase().includes(filters.customerName.toLowerCase());
            
            return statusMatch && totalMatch && nameMatch;
          });
  
          resolve(filteredOrders);
        }, 200);
      });
    }
  
    // Order processing workflow with retry
    async processOrderWithRetry(
      orderId: string, 
      maxRetries: number = 3
    ): Promise<Order> {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          // Simulate potential processing failure
          if (Math.random() < 0.3) {
            throw new Error('Processing failed');
          }
  
          return await this.updateOrderStatus(orderId, OrderStatus.PROCESSING);
        } catch (error) {
          if (attempt === maxRetries) {
            throw new Error(`Failed to process order ${orderId} after ${maxRetries} attempts`);
          }
          
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
      
      throw new Error('Unexpected error in order processing');
    }
  }
  
  // Demonstration function
  async function demonstrateOrderManagement() {
    const orderService = new OrderService();
  
    try {
      // Generate multiple orders
      console.log('Generating multiple orders:');
      const orders = await orderService.generateMultipleOrders(5);
      console.log(orders);
  
      // Update order status
      if (orders.length > 0) {
        console.log('\nUpdating order status:');
        const updatedOrder = await orderService.updateOrderStatus(
          orders[0].id, 
          OrderStatus.SHIPPED
        );
        console.log(updatedOrder);
      }
  
      // Search orders
      console.log('\nSearching orders:');
      const pendingOrders = await orderService.searchOrders({ 
        status: OrderStatus.PENDING 
      });
      console.log('Pending Orders:', pendingOrders);
  
      // Process order with retry
      if (pendingOrders.length > 0) {
        console.log('\nProcessing order with retry:');
        const processedOrder = await orderService.processOrderWithRetry(
          pendingOrders[0].id
        );
        console.log(processedOrder);
      }
  
    } catch (error) {
      console.error('Error in order management:', error);
    }
  }
  
  // Run the demonstration
  demonstrateOrderManagement();