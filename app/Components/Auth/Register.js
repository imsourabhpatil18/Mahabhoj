import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import logo from "../../../assets/MahabhojLogo.png";
import {
  CountryButton,
  CountryPicker,
} from "react-native-country-codes-picker";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../http/postApi";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterScreen = () => {
  const route = useRouter();
  const [countryCode, setCountryCode] = useState("+1");
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username field is required"),
    email: Yup.string()
      .email("Invalid email format.")
      .required("Email field is required."),
    phone_number: Yup.string()
      .matches(/^\d{1,10}$/, "The phone number must not exceed 10 characters.")
      .required("Contact number field is required."),
    password: Yup.string()
      .min(8, "The password must be at least 8 characters.")
      .required("Password field is required."),
    password_confirmation: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "The password confirmation does not match."
      )
      .required("Confirm password field is required."),
  });

  // UseMutation hook to handle registration
  const { mutate, isLoading, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.type === "success") {
        setLoading(false);
        route.back();
      }
    },
    onError: (error) => {
      console.log("registration error");
    },
  });

  const initialValues = {
    username: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  };

  const handleSubmit = (values) => {
    setLoading(true);
    const formData = {
      ...values,
      countryCode,
    };

    mutate(formData);
  };

  function ListHeaderComponent({ countries, lang, onPress }) {
    return (
      <View
        style={{
          paddingBottom: 20,
        }}
      >
        <Text>Popular countries</Text>
        {countries?.map((country, index) => {
          return (
            <CountryButton
              key={index}
              item={country}
              name={country?.name?.[lang || "en"]}
              onPress={() => onPress(country)}
            />
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Create an Account</Text>

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
          <View>
            <TextInput
              name="username"
              placeholder="Username"
              style={[
                styles.input,
                touched.username && errors.username
                  ? styles.inputError
                  : styles.inputDefault,
              ]}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            <ErrorMessage
              name="username"
              component={Text}
              style={styles.errorText}
            />

            <TextInput
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              style={[
                styles.input,
                touched.email && errors.email
                  ? styles.inputError
                  : styles.inputDefault,
              ]}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <ErrorMessage
              name="email"
              component={Text}
              style={styles.errorText}
            />

            <View style={styles.phoneContainer}>
              <TouchableOpacity
                style={[
                  touched.phone_number && errors.phone_number
                    ? styles.countryCodeButtonError
                    : styles.countryCodeButtonDefault,
                ]}
                onPress={() => setShowPicker(true)}
              >
                <Text style={styles.countryCodeText}>{countryCode}</Text>
              </TouchableOpacity>
              <TextInput
                name="phone_number"
                placeholder="Contact Number"
                keyboardType="phone-pad"
                style={[
                  styles.phoneInput,
                  touched.phone_number && errors.phone_number
                    ? styles.inputError
                    : styles.inputDefault,
                ]}
                onChangeText={handleChange("phone_number")}
                onBlur={handleBlur("phone_number")}
                value={values.phone_number}
              />
            </View>
            <ErrorMessage
              name="phone_number"
              component={Text}
              style={styles.errorText}
            />

            <CountryPicker
              show={showPicker}
              pickerButtonOnPress={(item) => {
                setCountryCode(item.dial_code);
                setShowPicker(false);
              }}
              ListHeaderComponent={ListHeaderComponent}
              popularCountries={["us", "in"]}
            />

            <TextInput
              name="password"
              placeholder="Password"
              secureTextEntry
              style={[
                styles.input,
                touched.password && errors.password
                  ? styles.inputError
                  : styles.inputDefault,
              ]}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <ErrorMessage
              name="password"
              component={Text}
              style={styles.errorText}
            />

            <TextInput
              name="password_confirmation"
              placeholder="Confirm Password"
              secureTextEntry
              style={[
                styles.input,
                touched.password_confirmation && errors.password_confirmation
                  ? styles.inputError
                  : styles.inputDefault,
              ]}
              onChangeText={handleChange("password_confirmation")}
              onBlur={handleBlur("password_confirmation")}
              value={values.password_confirmation}
            />
            <ErrorMessage
              name="password_confirmation"
              component={Text}
              style={styles.errorText}
            />

            {/* <TouchableOpacity
              style={styles.registerButton}
              onPress={handleSubmit}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? "loading" : "Register"}
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.registerButtonText}>Register</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => route.back()}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    // fontWeight: "bold",
    color: "#ffffff",
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
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  countryCodeButtonDefault: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },

  countryCodeButtonError: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },

  countryCodeText: {
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  registerButton: {
    paddingVertical: 10,
    marginTop: 5,
    backgroundColor: "#038b5e",
    borderRadius: 5,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#ffffff",
    marginRight: 10,
  },
  loginButtonText: {
    fontSize: 14,
    color: "#038b5e",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default RegisterScreen;
