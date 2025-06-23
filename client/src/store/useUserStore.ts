import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { type LogingType, type SignupType } from "@/schema/userSchema";
const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.baseURL = API_END_POINT;

type User={
  fullName: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  prfilePicture: string;
  admin: boolean;
  isVerified: boolean;
}

type UserState = {
  user: null | User; // Define the type of user based on your application
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;

  signup: (input: SignupType) => Promise<void>;
  login: (input: LogingType) => Promise<void>;
  verifyEmail: (otp: string) => Promise<void>;
  checkAuntgentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
};

// Define the user store with Zustand
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,
      // signup api implementation start here
      signup: async (input: SignupType) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
             withCredentials: true,
          });
          if (response.data.success) {
            console.log("Signup successful:", response.data);
            toast.success(response.data.message);
            set({
              user: response.data.user,
              loading: false,
              isAuthenticated: true,
            });
          }
          return response.data; // Return the response data for further use if needed
        } catch (error) {
          set({ loading: false });
          console.error(error);
          toast.error("Signup failed");
        }
      },

      // login api implementation start here
      login: async (input: LogingType) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
             withCredentials: true,
          });
          if (response.data.success) {
            console.log("Login successful:", response.data);
            toast.success(response.data.message);
            set({
              user: response.data.user,
              loading: false,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          set({ loading: false });
          console.error(error);
          toast.error("Login failed");
        }
      },

      //verify email api implementation start here
      verifyEmail: async (otp: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/verify-email`,
            { otp },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            console.log("OTP verification successful:", response.data);
            toast.success(response.data.message);
            set({
              user: response.data.user,
              loading: false,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          set({ loading: false });
          console.error(error);
          toast.error("OPT verification failed");
        }
      },

      checkAuntgentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const response = await axios.get(`${API_END_POINT}/check-auth`,{ withCredentials: true,});
          if (response.data.success) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch (error) {
          set({
            isAuthenticated: false,
            isCheckingAuth: false,
          });
          console.error(error);
          toast.error("User not authenticated");
        }
      },

      // logout api implementation start here
      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);
          if (response.data.success) {
            console.log("Logout successful:", response.data);
            toast.success(response.data.message);
            set({
              user: null,
              loading: false,
              isAuthenticated: false,
            });
          }
        } catch (error) {
          set({ loading: false });
          console.error(error);
          toast.error("Logout failed");
        }
      },

      // forgot password api implementation start here
      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/forgot-password`,
            { email },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            console.log("Forgot password successful:", response.data);
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          set({ loading: false });
          console.error(error);
          toast.error("Forgot password failed");
        }
      },

      // reset password api implementation start here
      resetPassword: async (token: string, password: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/reset-password/${token}`,
            { password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            console.log("Reset password successful:", response.data);
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          set({ loading: false });
          console.error(error);
          toast.error("Reset password failed");
        }
      },

      // update profile api implementation start here
      updateProfile: async (input: any) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_END_POINT}/profile/update`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            console.log("Profile updated successfully:", response.data);
            toast.success(response.data.message);
            set({
              user: response.data.user,
              loading: false,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          set({ loading: false });
          console.error(error);
          toast.error("Profile update failed");
        }
      },
    }),
    {
      name: "user-storage", // unique name
      storage: createJSONStorage(() => localStorage), // use localStorage as the storage
    }
  )
);
