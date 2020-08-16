export interface CreateOrderDTO {
    products: {
        product: string;
        quantity: string;
    }[];
}