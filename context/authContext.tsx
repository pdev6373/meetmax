"use client";
import { useAxios } from "@/hooks";
import useRefreshToken from "@/hooks/useRefreshToken";
import { CalendarValueType, GenderType, LayoutType } from "@/types";
import format from "date-fns/format";
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

type UserDetailsType = {
  userDetails: UserType;
  setUserDetails: Dispatch<SetStateAction<UserType>>;
};

type AuthContextType = {
  fields: FieldsType;
  setFields: SetFieldsType;
  resetFields: () => void;
  forgotPassword: RequestType;
  resetPassword: ResetPasswordType;
  accessToken: AccessTokenType;
  userDetails: UserDetailsType;
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
  userDetails: {
    userDetails: userInitialValues,
    setUserDetails: () => {},
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
    fetchData: sendPasswordResetLink,
    loading: sendingPasswordResetLink,
  } = useAxios();
  const { fetchData: resetUserPassword, loading: resettingUserPassword } =
    useAxios();
  const [userDetails, setUserDetails] = useState<UserType>(userInitialValues);

  const resetFields = () => {
    setEmail("");
    setName("");
    setPassword("");
    setDateOfBirth(null);
    setGender(genderInitialValue);
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

  const logout = async () => {
    setAccessToken("");
    setUserDetails(userInitialValues);

    try {
      const response = await resetUserPassword({
        url: "/auth/logout",
        method: "PATCH",
        payload: {},
      });

      return { succeeded: true, response };
    } catch (error: any) {
      return { succeeded: false };
    }
  };

  const persistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();

    useEffect(() => {
      refresh();
    }, []);
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
        forgotPassword: {
          loading: sendingPasswordResetLink,
          makeRequest: forgotPassword,
        },
        resetPassword: {
          loading: resettingUserPassword,
          makeRequest: resetPassword,
        },
        userDetails: {
          userDetails,
          setUserDetails,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
