"use client";
import { useFetch } from "@/hooks";
import { CalendarValueType, GenderType, LayoutType } from "@/types";
import format from "date-fns/format";
import { useState } from "react";
import { createContext, Dispatch, SetStateAction } from "react";

type FieldsType = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: CalendarValueType;
  gender: GenderType;
};

type SetFieldsType = {
  setEmail: Dispatch<SetStateAction<string>>;
  setName: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  setDateOfBirth: Dispatch<SetStateAction<CalendarValueType>>;
  setGender: Dispatch<SetStateAction<GenderType>>;
};

type RequestType = {
  loading: boolean;
  makeRequest: () => any;
};

type ResetPasswordType = {
  loading: boolean;
  makeRequest: (token: string) => any;
};

type AccessTokenType = {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
};

type AuthContextType = {
  fields: FieldsType;
  setFields: SetFieldsType;
  resetFields: () => void;
  sendVerificationLink: RequestType;
  login: RequestType;
  forgotPassword: RequestType;
  resetPassword: ResetPasswordType;
  accessToken: AccessTokenType;
};

const genderInitialValue: GenderType = {
  id: "male",
  label: "Male",
};

export const AuthContext = createContext<AuthContextType>({
  fields: {
    email: "",
    dateOfBirth: null,
    gender: genderInitialValue,
    name: "",
    password: "",
    confirmPassword: "",
  },
  setFields: {
    setName: () => {},
    setPassword: () => {},
    setConfirmPassword: () => {},
    setEmail: () => {},
    setGender: () => {},
    setDateOfBirth: () => {},
  },
  resetFields: () => {},
  sendVerificationLink: {
    loading: false,
    makeRequest: () => {},
  },
  login: {
    loading: false,
    makeRequest: () => {},
  },
  forgotPassword: {
    loading: false,
    makeRequest: () => {},
  },
  resetPassword: {
    loading: false,
    makeRequest: () => {},
  },
  accessToken: {
    accessToken: null,
    setAccessToken: () => {},
  },
});

export const AuthProvider = ({ children }: LayoutType) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<CalendarValueType>(null);
  const [gender, setGender] = useState(genderInitialValue);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const {
    fetchData: sendVerificationEmail,
    loading: sendingVerificationEmail,
  } = useFetch();
  const { fetchData: loginUser, loading: loggingIn } = useFetch();
  const {
    fetchData: sendPasswordResetLink,
    loading: sendingPasswordResetLink,
  } = useFetch();
  const { fetchData: resetUserPassword, loading: resettingUserPassword } =
    useFetch();

  const resetFields = () => {
    setEmail("");
    setName("");
    setPassword("");
    setDateOfBirth(null);
    setGender(genderInitialValue);
  };

  const sendVerificationLink = async () => {
    try {
      const response = await sendVerificationEmail({
        url: "/auth/register",
        method: "POST",
        payload: {
          email,
          firstname: name.split(" ")[0],
          lastname: name.split(" ").slice(1).join(" "),
          password,
          dateOfBirth: format(dateOfBirth as Date, "yyyy/MM/dd"),
          gender: gender.label,
        },
      });

      return { succeeded: true, response };
    } catch (error: any) {
      return { succeeded: false };
    }
  };

  const login = async () => {
    try {
      const response = await loginUser({
        url: "/auth/login",
        method: "POST",
        payload: {
          email,
          password,
        },
      });

      return { succeeded: true, response };
    } catch (error: any) {
      return { succeeded: false };
    }
  };

  const forgotPassword = async () => {
    try {
      const response = await sendPasswordResetLink({
        url: "/auth/forgot-password",
        method: "POST",
        payload: { email },
      });

      return { succeeded: true, response };
    } catch (error: any) {
      return { succeeded: false };
    }
  };

  const resetPassword = async (token: string) => {
    try {
      const response = await resetUserPassword({
        url: "/auth/new-password",
        method: "PATCH",
        payload: { password, token },
      });

      return { succeeded: true, response };
    } catch (error: any) {
      return { succeeded: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        fields: {
          email,
          name,
          password,
          confirmPassword,
          dateOfBirth,
          gender,
        },
        setFields: {
          setEmail,
          setDateOfBirth,
          setGender,
          setName,
          setPassword,
          setConfirmPassword,
        },
        resetFields,
        sendVerificationLink: {
          loading: sendingVerificationEmail,
          makeRequest: sendVerificationLink,
        },
        login: {
          loading: loggingIn,
          makeRequest: login,
        },
        accessToken: {
          accessToken,
          setAccessToken,
        },
        forgotPassword: {
          loading: sendingPasswordResetLink,
          makeRequest: forgotPassword,
        },
        resetPassword: {
          loading: resettingUserPassword,
          makeRequest: resetPassword,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
