import { AxiosError } from "axios";
import { createContext, useLayoutEffect, useState } from "react";
import { axiosCustomized } from "../../../api/axios";

type AuthContextTypes = {
  token: {
    accessToken: string;
  };
  setToken: React.Dispatch<React.SetStateAction<{ accessToken: string }>>;
};

export const AuthContext = createContext({} as AuthContextTypes);

type AuthProviderTypes = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderTypes) {
  const [token, setToken] = useState({ accessToken: "" });

  useLayoutEffect(() => {
    const authInterceptor = axiosCustomized.interceptors.request.use(
      (config) => {
        config.headers.Authorization =
          !config._retry && token
            ? `Bearer ${token}`
            : config.headers.Authorization;
        return config;
      }
    );

    return () => {
      axiosCustomized.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axiosCustomized.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequset = error.config;
        if (error.response?.status === 403) {
          try {
            const response = await axiosCustomized.get(`/auth/refresh`);

            setToken({ accessToken: response.data.accessToken });

            if (originalRequset) {
              originalRequset.headers.Authorization = `Bearer ${response.data.accessToken}`;
              originalRequset._retry = true;

              return axiosCustomized(originalRequset);
            }
          } catch (error) {
            setToken({ accessToken: "" });
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosCustomized.interceptors.request.eject(refreshInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
