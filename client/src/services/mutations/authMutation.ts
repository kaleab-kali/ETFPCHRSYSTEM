import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPasswordRequest, loginEmployee, loginInvStaff } from "../../services/api/authApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = (loginType: "employee" | "hrstaffs") => {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      setLoading(true);
      if (loginType === "employee") {
        return await loginEmployee(values.email, values.password);
      } else {
        return await loginInvStaff(values.email, values.password);
      }
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to login");
      setLoading(false);
    },
    onSuccess: (data) => {
      console.log("success");
      login(data.token, data.role, loginType, data?.employeeId, data?.ObjId);
      navigate("/");
      message.success("Login successful!");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
};

export const useForgetPasswordRequestMutation = () => {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
//   const { login } = useAuth();
//   const navigate = useNavigate();

  return useMutation({
    mutationFn: async (email: string) => {
      setLoading(true);
      return forgotPasswordRequest(email);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to send reset password");
      setLoading(false);
    },
    onSuccess: (data) => {
      console.log("success");
      message.success("Sent Request successfully!");
      setLoading(false);
    },
    onSettled: async (_, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["request"] });
      }
    },
  });
};
