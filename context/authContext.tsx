"use client";
import { CalendarValueType, GenderType, LayoutType } from "@/types";
import { useEffect, useState } from "react";
import { createContext, Dispatch, SetStateAction } from "react";

type UserType = {
  firstname: string;
  lastname: string;
  gender: "Male" | "Female" | null;
  dateOfBirth: string | null;
  email: string;
  isVerified: boolean;
  _id: string;

  bio: string;
  phoneNumber: string;
  website: string;
  location: string;

  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };

  followers: {
    amount: number;
    data: UserType[];
  };

  followings: {
    amount: number;
    data: UserType[];
  };
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
  setGender: Dispatch<SetStateAction<"Male" | "Female">>;
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
  remember: "yes" | "no";
  setRemember: Dispatch<SetStateAction<"yes" | "no">>;
};

type AuthContextType = {
  fields: FieldsType;
  setFields: SetFieldsType;
  resetFields: () => void;
  accessToken: AccessTokenType;
  userDetails: UserDetailsType;
  remember: RememberType;
};

const genderInitialValue: GenderType = "Male";

const userInitialValues: UserType = {
  firstname: "",
  lastname: "",
  gender: null,
  dateOfBirth: null,
  email: "",
  isVerified: false,
  _id: "",

  bio: "",
  phoneNumber: "",
  website: "",
  location: "",
  socialLinks: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  },

  followers: {
    amount: 0,
    data: [],
  },

  followings: {
    amount: 0,
    data: [],
  },
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
  accessToken: {
    accessToken: null,
    setAccessToken: () => {},
  },
  userDetails: {
    userDetails: userInitialValues,
    setUserDetails: () => {},
  },
  remember: {
    remember: "yes",
    setRemember: () => {},
  },
});

export const AuthProvider = ({ children }: LayoutType) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<CalendarValueType>(null);
  const [gender, setGender] = useState<GenderType>(genderInitialValue);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserType>(userInitialValues);
  const [remember, setRemember] = useState<"yes" | "no">("yes");

  useEffect(() => {
    setRemember(
      localStorage?.getItem("meetmax_remember")
        ? (localStorage.getItem("meetmax_remember") as "yes" | "no")
        : "yes"
    );
  }, []);

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
