"use client";
import { useState } from "react";
import { LayoutType, PostType } from "@/types";
import { createContext, Dispatch, SetStateAction } from "react";
import { UserType } from "@/types";
import { userInitialValues } from "@/constants";

type FieldsType = {
  posts: PostType[];
  poster: UserType;
};

type SetFieldsType = {
  setPosts: Dispatch<SetStateAction<PostType[]>>;
  setPoster: Dispatch<SetStateAction<UserType>>;
};

type AuthContextType = {
  fields: FieldsType;
  setFields: SetFieldsType;
};

export const PostContext = createContext<AuthContextType>({
  fields: {
    posts: [],
    poster: userInitialValues,
  },
  setFields: {
    setPosts: () => {},
    setPoster: () => {},
  },
});

export const PostProvider = ({ children }: LayoutType) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [poster, setPoster] = useState(userInitialValues);

  return (
    <PostContext.Provider
      value={{
        fields: {
          posts,
          poster,
        },
        setFields: {
          setPosts,
          setPoster,
        },
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
