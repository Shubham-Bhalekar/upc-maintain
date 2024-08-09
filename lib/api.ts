import axios, { AxiosResponse } from "axios";
import { getValueFor } from "./secure-store";

const access_token = async () => await getValueFor("access_token");

export const fetchData = async (url: string, token?: boolean): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.get(url, {
      headers: {
        ...(token && { Authorization: `Bearer ${await access_token()}` }),
      },
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postData = async (
  url: string,
  data: Object,
  token?: boolean
): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${await access_token()}` }),
      },
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error posting data:", error);
    throw error;
  }
};

export const putData = async (
  url: string,
  data: Object,
  token?: boolean
): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${await access_token()}` }),
      },
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error putting data:", error);
    throw error;
  }
};
