import { useContext, MutableRefObject } from "react";
import { PostContext } from "@/context/postContext";
import { useAxiosPrivate } from "@/hooks";
import { AuthContext } from "@/context/authContext";
import { VisibilityType } from "@/types";

type PostReqType = {
  message?: MutableRefObject<string>;
  images?: File[];
  visibility?: VisibilityType;
};

export default function usePostReq() {
  const { fetchData: fetchPosts, loading: fetchingPosts } = useAxiosPrivate();
  const { fetchData: createUserPost, loading: creatingPost } =
    useAxiosPrivate();
  const { fetchData: reactToOnePost, loading: reactingToPost } =
    useAxiosPrivate();
  const {
    setFields: { setPosts },
  } = useContext(PostContext);
  const {
    userDetails: { userDetails },
  } = useContext(AuthContext);

  const fetchAllPosts = async () => {
    const response = await fetchPosts({
      url: `post/posts/${userDetails._id}`,
      method: "GET",
    });

    if (!response?.success || !response?.data?.success) return response;
    setPosts(response?.data?.data);
    return response;
  };

  const createAPost = async ({
    message = { current: "" },
    images = [],
    visibility,
  }: PostReqType) => {
    const formData = new FormData();
    formData.append("id", userDetails._id);
    if (message.current) formData.append("message", message.current);
    if (visibility) formData.append("visibility", visibility);
    if (images.length) {
      images.forEach((image) => formData.append("image", image));
    }

    const response = await createUserPost({
      url: `/post`,
      method: "POST",
      contentType: "multipart/form-data",
      payload: formData,
    });

    message.current = "";

    if (!response?.success || !response?.data?.success) return response;
    setPosts(response?.data?.data);

    return response;
  };

  const reactToAPost = async (postId: string) => {
    const response = await reactToOnePost({
      url: `post/react-to-post`,
      method: "PATCH",
      payload: {
        id: userDetails._id,
        postId,
      },
    });

    if (!response?.success || !response?.data?.success) return response;
    setPosts(response?.data?.data);
    return response;
  };

  const getPosts = {
    loading: fetchingPosts,
    makeRequest: fetchAllPosts,
  };

  const createPost = {
    loading: creatingPost,
    makeRequest: createAPost,
  };

  const reactToPost = {
    loading: reactingToPost,
    makeRequest: reactToAPost,
  };

  return { getPosts, createPost, reactToPost };
}
