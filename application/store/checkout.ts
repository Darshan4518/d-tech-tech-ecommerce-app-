import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Product {
  id: number;
  model: string;
  image: string;
  price: number;
  color: string;
}

interface ProductStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  clearProduct: () => void;
}

const useCheckoutStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),
      clearProduct: () => {
        set(() => ({
          products: [],
        }));
      },
    }),
    {
      name: "checkout",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCheckoutStore;
