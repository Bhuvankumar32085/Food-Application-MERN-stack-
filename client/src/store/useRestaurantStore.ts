import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import type { RestaurantState } from "@/types/resturantType";
import type { Orders } from "@/types/orderType";

const API_ENDPOINT = "http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set, get) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrders: [],

      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            set({ loading: false });
            toast.success(response.data.message); // Show success message
          }
        } catch (error) {
          set({ loading: false });
          console.error("Error creating restaurant:", error);
          toast.error("Failed to create restaurant. Please try again."); // Show error message
          throw error; // Re-throw the error to handle it in the component
        }
      },

      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_ENDPOINT}/`);
          if (response.data.success) {
            set({ loading: false, restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          if (error.response.status === 404) {
            set({ restaurant: null });
          }
          set({ loading: false });
        }
      },

      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_ENDPOINT}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            set({ loading: false, restaurant: response.data.restaurant }); // Update the restaurant data in the store
            toast.success(response.data.message);
          }
        } catch (error) {
          set({ loading: false });
          console.error("Error updating restaurant:", error);
          toast.error("Failed to update restaurant. Please try again."); // Show error message
          throw error; // Re-throw the error to handle it in the component
        }
      },

      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: string[]
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          const response = await axios.get(
            `${API_ENDPOINT}/search/${searchText}?${params.toString()}`
          );
          if (response.data.success) {
            set({ loading: false, searchedRestaurant: response.data }); // Set the search results in the store
            // toast.success("Search completed successfully!"); // Show success message
          }
        } catch (error) {
          set({ loading: false });
          console.error("Error searching restaurant:", error);
          toast.error("Failed to search restaurant. Please try again."); // Show error message
          throw error; // Re-throw the error to handle it in the component
        }
      },

      setAppliedFilter: (value: string) => {
        set((state) => {
          const isAleradyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAleradyApplied
            ? state.appliedFilter.filter((filter) => filter !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },

      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },

      getSingleRestaurant: async (restaurabtId: string) => {
        try {
          const response = await axios.get(`${API_ENDPOINT}/${restaurabtId}`);
          if (response.data.success) {
            set({ singleRestaurant: response.data });
          }
        } catch (error) {
          console.log(error);
        }
      },

      getReataurantOrdes: async () => {
        try {
          const response = await axios.get(`${API_ENDPOINT}/order`);
          if (response.data.success) {
            set({ restaurantOrders: response.data.orders });
          }
        } catch (e) {
          console.log(e);
        }
      },

      updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
          const response = await axios.put(
            `${API_ENDPOINT}/order/${orderId}/status`,
            { status },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            const udatedOrder = get().restaurantOrders.map((order: Orders) => {
              return order._id === orderId
                ? { ...order, status: response.data.status }
                : order;
            });
            set({ restaurantOrders: udatedOrder });
            toast.success(response.data.message);
          }
        } catch (e: any) {
          console.log(e);
          toast.error(e.response.data.message);
        }
      },
    }),
    {
      name: "restaurant-storage", // unique name for the storage
      storage: createJSONStorage(() => localStorage), // use localStorage as the storage
    }
  )
);
