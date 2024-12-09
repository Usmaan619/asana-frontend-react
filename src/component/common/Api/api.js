import axios from "axios";
import { environment } from "../../../environment/environment";
import axiosInstance from "../../../interceptors/axios.interceptor";
import { GET_CASHE } from "../../../utils/helper";

export const featctAllTicket = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}task/getAllTasks`
    );
    return response.data;
  } catch (error) {
    throw error?.response;
  }
};

export const fetchTicketData = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}user/getAllUser`
    );
    return response?.data?.users;
  } catch (error) {
    throw error?.response;
  }
};

export const featchAllUser = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}user/getAllUser`
    );
    return response?.data?.users;
  } catch (error) {
    throw error?.response;
  }
};

export const updateTaskAPI = async (id, payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}task/updateTask/${id}`,
      payload
    );

    return response?.data;
  } catch (error) {
    throw error?.response;
  }
};

export const DeleteDailyTaskAPI = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `${environment?.apiUrl}task/DeleteTaskDailyUpdate/${id}`
    );

    return response?.data;
  } catch (error) {
    throw error?.response;
  }
};

export const UpdateTaskDailyUpdateAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}task/UpdateTaskDailyUpdate`,
      payload
    );

    return response?.data;
  } catch (error) {
    throw error?.response;
  }
};

export const createTaskAPI = async (payload) => {
  try {
    const token = GET_CASHE("token");
    console.log("token: ", token);
    const response = await axios.post(
      `${environment?.apiUrl}task/create`,

      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      }
    );

    return response?.data;
  } catch (error) {
    throw error?.response;
  }
};

export const loginAPI = async (payload) => {
  try {
    const response = await axios.post(`${environment?.apiUrl}login`, payload);
    return response?.data;
  } catch (error) {
    throw error?.response;
  }
};

export const signUpAPI = async (payload) => {
  try {
    const response = await axios.post(
      `${environment?.apiUrl}user/signUp`,
      payload
    );
    return response;
  } catch (error) {
    throw error?.response;
  }
};

export const resetPasswordAPI = async (payload) => {
  try {
    const response = await axios.post(
      `${environment?.apiUrl}user/reset-password`,
      payload
    );
    return response?.data;
  } catch (error) {
    throw error?.response;
  }
};

export const SendOTPMailAPI = async (payload) => {
  try {
    const response = await axios.post(
      `${environment?.apiUrl}user/send-otp`,
      payload
    );
    return response?.data;
  } catch (error) {
    throw error?.response;
  }
};

export const createTaskDailyUpdateAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}task/createTaskDailyUpdate`,
      payload
    );

    return response?.data;
  } catch (error) {
    throw error?.response;
  }
};

export const getAllDailyTaskUpdate = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}task/getAllDailyTaskUpdate`
    );
    return response?.data?.tasks;
  } catch (error) {
    throw error?.response;
  }
};

export const getAllTasksCountAPI = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}task/getAllTasksCount`
    );

    return response?.data;
  } catch (error) {
    throw error?.response;
  }
};

export const getTaskByStatusAndIdAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}task/getTaskByStatusAndId`,
      payload
    );

    return response?.data;
  } catch (error) {
    throw error?.response;
  }
};

export const getDailyTaskUpdateFilterAPI = async (startDate) => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}task/tickets/filter?startDate=${startDate}`
    );
    return response?.data;
  } catch (error) {
    throw error?.response;
  }
};
