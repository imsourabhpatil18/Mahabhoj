import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Logo from "../../../assets/MahabhojLogo.png";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoginUser } from "../http/postApi";
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider as PaperProvider, Snackbar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const LoginScreen = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    usernameOrEmail: Yup.string().required("This field is required"),
    password: Yup.string().required("Must enter password to proccesd."),
  });

  const { mutate, isLoading: loginLoading } = useMutation({
    mutationFn: LoginUser,
    onSuccess: async (data) => {
      if (data && data.data.authToken) {
        setLoading(false);
        const currentTime = new Date().getTime();
        await AsyncStorage.setItem("authTokenStreamdeck", data.data.authToken);
        await AsyncStorage.setItem(
          "authTokenTimestamp",
          currentTime.toString()
        );
        await AsyncStorage.setItem("isLoggedInStreamdeck", "true");
        await AsyncStorage.setItem("usernameStreamdeck", data.data.username);
        await AsyncStorage.setItem("emailStreamdeck", data.data.email);
        route.push("../Home/Home");
      } else {
        setLoading(false);
        setSnackbarVisible(true);
        setSnackbarMessage("Login failed. Please check your credentials");
      }
    },
    onError: (error) => {
      console.log(error);

      setLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setSnackbarVisible(true);
      setSnackbarMessage(errorMessage);
    },
  });

  const initialValues = {
    usernameOrEmail: "",
    password: "",
  };

  const handleSubmit = (values) => {
    setLoading(true);
    const formData = { ...values };
    mutate(formData);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <TextInput
                name="usernameOrEmail"
                placeholder="Username/Email"
                style={[
                  styles.input,
                  touched.usernameOrEmail && errors.usernameOrEmail
                    ? styles.inputError
                    : styles.inputDefault,
                ]}
                onChangeText={handleChange("usernameOrEmail")}
                onBlur={handleBlur("usernameOrEmail")}
                value={values.usernameOrEmail}
              />
              <ErrorMessage
                name="usernameOrEmail"
                component={Text}
                style={styles.errorText}
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  name="password"
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  style={[
                    styles.input,
                    styles.passwordInput,
                    touched.password && errors.password
                      ? styles.inputError
                      : styles.inputDefault,
                  ]}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.iconContainer}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              <ErrorMessage
                name="password"
                component={Text}
                style={styles.errorText}
              />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <Link href="/Register" style={styles.registerButtonText}>
            Create new
          </Link>
        </View>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          action={{
            label: "Dismiss",
            onPress: () => {
              // Do something
            },
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000000",
  },
  form: {
    width: "100%",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  input: {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  inputDefault: {
    marginBottom: 15,
  },
  inputError: {
    marginBottom: 2,
    borderColor: "red",
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingRight: 45,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
  },
  loginButton: {
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "#038b5e",
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    color: "#ffffff",
    marginRight: 10,
  },
  registerButtonText: {
    fontSize: 14,
    color: "#038b5e",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
