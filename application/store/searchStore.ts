import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SearchStore {
  searchQueries: string[];
  setSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;
  removeSearchQuery: (q: string) => void;
}

const searchStore = create<SearchStore>()(
  persist(
    (set) => ({
      searchQueries: [] as string[],
      setSearchQuery: (query: string) => {
        set((state) => ({
          searchQueries: [query, ...state.searchQueries],
        }));
      },
      clearSearchQuery: () => {
        set(() => ({
          searchQueries: [],
        }));
      },
      removeSearchQuery: (q: string) => {
        set((state) => ({
          searchQueries: state.searchQueries.filter((query) => query !== q),
        }));
      },
    }),
    {
      name: "search-history",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default searchStore;
