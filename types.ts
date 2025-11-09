export type Product = {
  sku: string;
  name: string;
  category: string;
  unit: string;
  supplier: string;
  pack_size?: string | null;
  comment?: string | null;
};

export type Catalog = Product[];

export type OrderItem = {
  sku: string;
  qty: number;
};

export type GroupedBySupplier = Record<string, Array<{ product: Product; qty: number }>>;
