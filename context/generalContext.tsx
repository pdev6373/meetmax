"use client";
import { useState, useEffect } from "react";
import { LayoutType } from "@/types";
import { createContext, Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";

type FieldsType = {
  search: string;
  friendsSearch: string;
  refetchToggle: boolean;
};

type SetFieldsType = {
  setSearch: Dispatch<SetStateAction<string>>;
  setFriendsSearch: Dispatch<SetStateAction<string>>;
  setRefetchToggle: Dispatch<SetStateAction<boolean>>;
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
  },
  setFields: {
    setSearch: () => {},
    setFriendsSearch: () => {},
    setRefetchToggle: () => {},
  },
});

export const GeneralProvider = ({ children }: LayoutType) => {
  const [search, setSearch] = useState("");
  const [friendsSearch, setFriendsSearch] = useState("");
  const [refetchToggle, setRefetchToggle] = useState(false);
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
        },
        setFields: {
          setSearch,
          setRefetchToggle,
          setFriendsSearch,
        },
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
