export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
  
  export type UpdateProductInput = Partial<CreateProductInput>;