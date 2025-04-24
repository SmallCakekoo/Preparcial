export type Products = {
  id: number;
  product: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  type: TypeArray[];
};

export type TypeArray = {
  id: number;
  typeId: number;
  productsId: number;
};

export interface ProductType {
    id: number;
    type: string;
    description: string;
  }
  