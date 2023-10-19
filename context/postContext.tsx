"use client";
import { LayoutType, PostType } from "@/types";
import { useEffect, useState } from "react";
import { createContext, Dispatch, SetStateAction } from "react";
import { UserType } from "@/types";
import { userInitialValues } from "@/constants";
import { useAxiosPrivate } from "@/hooks";

type FieldsType = {
  posts: PostType[];
  poster: UserType;
};

type SetFieldsType = {
  setPosts: Dispatch<SetStateAction<PostType[]>>;
  setPoster: Dispatch<SetStateAction<UserType>>;
};

type ActionType = {
  makeRequest: any;
  loading: boolean;
};

type ActionsType = {
  getPosts: ActionType;
};

type AuthContextType = {
  fields: FieldsType;
  setFields: SetFieldsType;
  actions: ActionsType;
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
  actions: {
    getPosts: {
      loading: false,
      makeRequest: () => {},
    },
  },
});

export const PostProvider = ({ children }: LayoutType) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [poster, setPoster] = useState(userInitialValues);
  const { fetchData: getAllPosts, loading: gettingAllPosts } =
    useAxiosPrivate();

  const getPosts = async () => {
    const response = await getAllPosts({
      url: "/post",
      method: "GET",
    });
    if (!response?.success || !response?.data?.success) return response;
    setPosts(response?.data?.data);
    return response;
  };

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
        actions: {
          getPosts: {
            makeRequest: getPosts,
            loading: gettingAllPosts,
          },
        },
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
