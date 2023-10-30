"use client";
import { useState, useEffect } from "react";
import { LayoutType, UserType } from "@/types";
import { createContext, Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";

type FieldsType = {
  search: string;
  friendsSearch: string;
  refetchToggle: boolean;
  followers: UserType[];
};

type SetFieldsType = {
  setSearch: Dispatch<SetStateAction<string>>;
  setFriendsSearch: Dispatch<SetStateAction<string>>;
  setRefetchToggle: Dispatch<SetStateAction<boolean>>;
  setFollowers: Dispatch<SetStateAction<UserType[]>>;
};

type GeneralContextType = {
  fields: FieldsType;
  setFields: SetFieldsType;
};

export const GeneralContext = createContext<GeneralContextType>({
  fields: {
    search: "",
    friendsSearch: "",
    refetchToggle: false,
    followers: [],
  },
  setFields: {
    setSearch: () => {},
    setFriendsSearch: () => {},
    setRefetchToggle: () => {},
    setFollowers: () => {},
  },
});

export const GeneralProvider = ({ children }: LayoutType) => {
  const [search, setSearch] = useState("");
  const [friendsSearch, setFriendsSearch] = useState("");
  const [refetchToggle, setRefetchToggle] = useState(false);
  const [followers, setFollowers] = useState<UserType[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    setSearch("");
  }, [pathname, refetchToggle]);

  return (
    <GeneralContext.Provider
      value={{
        fields: {
          search,
          refetchToggle,
          friendsSearch,
          followers,
        },
        setFields: {
          setSearch,
          setRefetchToggle,
          setFriendsSearch,
          setFollowers,
        },
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
