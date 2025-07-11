export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    category: string;
    image: string;
    rating?: number;
    stock: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductResponse {
    products: Product[];
}

export interface SingleProductResponse {
    product: Product;
}

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
}

export interface CartResponse {
    items: CartItem[];
}