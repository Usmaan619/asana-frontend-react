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
  } catch (error) {}
};

export const fetchTicketData = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}user/getAllUser`
    );
    return response?.data?.users;
  } catch (error) {}
};

export const featchAllUser = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}user/getAllUser`
    );
    return response?.data?.users;
  } catch (error) {}
};

export const updateTaskAPI = async (id, payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}task/updateTask/${id}`,
      payload
    );

    return response?.data;
  } catch (error) {}
};

export const createTaskAPI = async (payload) => {
  try {
    const token = GET_CASHE("token");
    const response = await axios.post(
      `${environment?.apiUrl}task/create`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      },
      payload
    );

    return response?.data;
  } catch (error) {}
};

export const loginAPI = async (payload) => {
  try {
    const response = await axios.post(`${environment?.apiUrl}login`, payload);
    return response?.data;
  } catch (error) {
    return error;
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
    return error;
  }
};

export const createTaskDailyUpdateAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}task/createTaskDailyUpdate`,
      payload
    );

    return response?.data;
  } catch (error) {}
};

export const getAllDailyTaskUpdate = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}task/getAllDailyTaskUpdate`
    );
    return response?.data?.tasks;
  } catch (error) {}
};

export const getAllTasksCountAPI = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}task/getAllTasksCount`
    );

    return response?.data;
  } catch (error) {
    return error;
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
    return error;
  }
};

export const getDailyTaskUpdateFilterAPI = async (startDate) => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}task/tickets/filter?startDate=${startDate}`
    );
    return response?.data;
  } catch (error) {
    return error;
  }
};
