"use client";
import { useAxios } from "@/hooks";
import { CalendarValueType, GenderType, LayoutType } from "@/types";
import { useState } from "react";
import { createContext, Dispatch, SetStateAction } from "react";

type UserType = {
  firstname: string;
  lastname: string;
  gender: "Male" | "Female" | null;
  dateOfBirth: string | null;
  email: string;
  isVerified: boolean;
};

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

type ResetPasswordType = {
  loading: boolean;
  makeRequest: (token: string) => any;
};

type AccessTokenType = {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
};

type UserDetailsType = {
  userDetails: UserType;
  setUserDetails: Dispatch<SetStateAction<UserType>>;
};

type RememberType = {
  remember: boolean;
  setRemember: Dispatch<SetStateAction<boolean>>;
};

type AuthContextType = {
  fields: FieldsType;
  setFields: SetFieldsType;
  resetFields: () => void;
  resetPassword: ResetPasswordType;
  accessToken: AccessTokenType;
  userDetails: UserDetailsType;
  remember: RememberType;
};

const genderInitialValue: GenderType = {
  id: "male",
  label: "Male",
};

const userInitialValues = {
  firstname: "",
  lastname: "",
  gender: null,
  dateOfBirth: null,
  email: "",
  isVerified: false,
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
  resetPassword: {
    loading: false,
    makeRequest: () => {},
  },
  accessToken: {
    accessToken: null,
    setAccessToken: () => {},
  },
  userDetails: {
    userDetails: userInitialValues,
    setUserDetails: () => {},
  },
  remember: {
    remember: false,
    setRemember: () => {},
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
  const [remember, setRemember] = useState(
    JSON.parse(localStorage.getItem("meetmax_remember") || "true") || true
  );
  const [userDetails, setUserDetails] = useState<UserType>(userInitialValues);
  const { fetchData: resetUserPassword, loading: resettingUserPassword } =
    useAxios();

  const resetFields = () => {
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
    setDateOfBirth(null);
    setGender(genderInitialValue);
    setAccessToken("");
    setUserDetails(userInitialValues);
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
        accessToken: {
          accessToken,
          setAccessToken,
        },
        resetPassword: {
          loading: resettingUserPassword,
          makeRequest: resetPassword,
        },
        userDetails: {
          userDetails,
          setUserDetails,
        },
        remember: {
          remember,
          setRemember,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
