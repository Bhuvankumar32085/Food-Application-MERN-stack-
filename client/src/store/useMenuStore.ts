import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_URL = "http://localhost:8000/api/v1/menu";
axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

type MenuState = {
  loading: boolean;
  menu: null;
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
};

export const useMenuSrore = create<MenuState>()(
  persist(
    (set) => ({
      loading: false,
      menu: null,
      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(API_URL, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            set({ menu: response.data.menu, loading: false });
            toast.success("Menu created successfully!");
          }
        } catch (error) {
          set({ loading: false });
          console.error("Error creating menu:", error);
          toast.error("Failed to create menu. Please try again.");
          throw error;
        }
      },

      editMenu: async (menuId: string, formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_URL}/${menuId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            set({ menu: response.data.menu, loading: false });
            toast.success("Menu updated successfully!");
          }
        } catch (error) {
          set({ loading: false });
          console.error("Error updating menu:", error);
          toast.error("Failed to update menu. Please try again.");
          throw error;
        }
      },
    }),
    {
      name: "menu-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
