const API_URL = process.env.REACT_APP_API_URL;
import { message } from "antd";

const processError = (error: any) => {
  console.error(error);
  message.error("Ops something went wrong");
  return Promise.resolve({});
};

export default {
  getUsers: () => {
    try {
      return fetch(`${API_URL}/users`).then((response) => response.json());
    } catch (error) {
      return processError(error);
    }
  },
  getTasks: async (pagination: any, filters: any) => {
    try {
      let requestParams: any = {
        page: pagination?.current,
        offset: (pagination?.current - 1) * 10,
        title: filters["title"],
        completed: filters["completed"],
      };

      // console.log("requestParams", requestParams);
      const queryString = Object.keys(requestParams)
        .filter((key) => requestParams[key])
        .map((key) => key + "=" + requestParams[key])
        .join("&");

      return fetch(`${API_URL}/tasks?${queryString}`).then((response) =>
        response.json()
      );
    } catch (error) {
      return processError(error);
    }
  },
};
