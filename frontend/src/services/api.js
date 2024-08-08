import axios from "axios";

export const SignupApi = async (formData) => {
  const { data } = await axios.post("/api/auth/signup", formData);
  return data;
};

export const LoginApi = async (formData) => {
  const { data } = await axios.post("/api/auth/login", formData);
  console.log(data);
  return data;
};

export const LogoutApi = async () => {
  const { data } = await axios.post("/api/auth/logout");
  return data;
};

export const CreateMessageApi = async (id, message) => {
  const { data } = await axios.post(`/api/messages/send/${id}`, { message });
  return data;
};

export const GetMessageApi = async (id) => {
  const { data } = await axios.get(`/api/messages/${id}`);
  return data;
};

export const GetUsersApi = async () => {
  const { data } = await axios.get(`/api/users`);
  return data;
};
