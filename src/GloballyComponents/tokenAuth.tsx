import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.111.111.102:5000/",
});

export const post = {
  ...instance,
  post: (url: string, data: object) => {
    const token = window.sessionStorage.getItem("token");
    return instance.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export const patch = {
  ...instance,
  patch: (url: string, data: object) => {
    const token = window.sessionStorage.getItem("token");
    return instance.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
