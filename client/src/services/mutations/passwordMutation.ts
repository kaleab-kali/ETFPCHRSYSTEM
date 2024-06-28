import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  forgotPasswordRequest,
  loginEmployee,
  loginInvStaff,
} from "../../services/api/authApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createFirstTimePasswordEmployee, resetPasswordEmployee } from "../api/passwordEmployee";

export const useResetPasswordEmployeeMutation = () => {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
    // const { login } = useAuth();
    const navigate = useNavigate();

  return useMutation({
    mutationFn: async (passw: any) => {
      setLoading(true);
      return resetPasswordEmployee(passw);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create new password");
      setLoading(false);
    },
    onSuccess: (data) => {
      console.log("success");
      navigate("/login")
      message.success("Set new password successfully!");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        // await queryClient.invalidateQueries({ queryKey: ["request"] });
      }
    },
  });
};

export const useFirstTimePasswordEmployeeMutation = () => {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  // const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (passw: any) => {
      setLoading(true);
      return createFirstTimePasswordEmployee(passw);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create new password");
      setLoading(false);
    },
    onSuccess: (data) => {
      console.log("success");
      navigate("/login");
      message.success("Set new password successfully!");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        // await queryClient.invalidateQueries({ queryKey: ["request"] });
      }
    },
  });
};
