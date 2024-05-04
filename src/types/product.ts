export type AddProductType = {
  name: string;
  price: number;
  category: string;
  description: string;
  size: string;
};

export type GetProductType = {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
  size: string[];
};

export type ProductSize = {
  [key: string]: number;
};

export type ProductCountContextType = {
  size: string[];
  selected: ProductSize | null;
  price: number;
  setPrice: (price: number) => void;
  selectSize: (size: string) => void;
  selectProduct: (size: string) => void;
  addCount: (size: string) => void;
  minusCount: (size: string) => void;
};
