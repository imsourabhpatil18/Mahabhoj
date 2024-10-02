import { Platform } from "react-native";

//function for Register API call
export const registerUser = async (values) => {
  const formData = new FormData();

  formData.append("username", values.username);
  formData.append("email", values.email);
  formData.append("country_code", values.countryCode);
  formData.append("phone_no", values.phone_number);
  formData.append("password", values.password);
  formData.append("password_confirmation", values.password_confirmation);
  formData.append("register_type", "platform");

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}api/v1/auth/register`,
    requestOptions
  );

  if (!response.ok) {
    const errorInfo = await response.json();

    const error = new Error("An Error occured while register user");
    error.info = errorInfo;
    error.code = response.status;

    throw error;
  }
  return response.json();
};

//function for Login API call
export const LoginUser = async (values) => {
  const formData = new FormData();

  formData.append("username", values.usernameOrEmail);
  formData.append("password", values.password);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL_Countries}api/v1/auth/login`,
    requestOptions
  );

  if (!response.ok) {
    const errorInfo = await response.json();

    const error = new Error("An Error occured while Login");
    error.info = errorInfo;
    error.code = response.status;

    throw error;
  }

  let res = await response.json();
  return res;
};
