import axios from "axios";
import { environment } from "../../../environment/environment";
import axiosInstance from "../../../interceptors/axios.interceptor";

export const featctAllTicket = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}task/getAllTasks`
    );
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const fetchTicketData = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}user/getAllUser`
    );
    return response?.data?.users;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const featchAllUser = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}user/getAllUser`
    );
    return response?.data?.users;
  } catch (error) {
    console.log("error: ", error);
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
    console.log("error: ", error);
  }
};

export const createTaskAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}task/create`,
      payload
    );
    console.log("response: ", response);

    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const loginAPI = async (payload) => {
  try {
    const response = await axios.post(`${environment?.apiUrl}login`, payload);
    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const signUpAPI = async (payload) => {
  try {
    const response = await axios.post(
      `${environment?.apiUrl}user/signUp`,
      payload
    );
    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const createTaskDailyUpdateAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `${environment?.apiUrl}task/createTaskDailyUpdate`,
      payload
    );
    console.log("response:createTaskDailyUpdateAPI ", response);

    return response?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getAllDailyTaskUpdate = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment?.apiUrl}task/getAllDailyTaskUpdate`
    );
    return response?.data?.tasks;
  } catch (error) {
    console.log("error: ", error);
  }
};
