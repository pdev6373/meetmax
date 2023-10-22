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

type PostUpdateType = {
  message?: MutableRefObject<string>;
  images?: File[];
  visibility?: VisibilityType;
  postId: string;
};

export default function usePostReq() {
  const { fetchData: fetchPosts, loading: fetchingPosts } = useAxiosPrivate();
  const { fetchData: createUserPost, loading: creatingPost } =
    useAxiosPrivate();
  const { fetchData: reactToOnePost, loading: reactingToPost } =
    useAxiosPrivate();
  const { fetchData: deletePostData, loading: deletingPostData } =
    useAxiosPrivate();
  const { fetchData: updateUserPost, loading: updatingUserPost } =
    useAxiosPrivate();
  const { fetchData: hidePostToUser, loading: hidingPostToUser } =
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

  const updateAPost = async ({
    message = { current: "" },
    images = [],
    visibility,
    postId,
  }: PostUpdateType) => {
    const formData = new FormData();
    formData.append("id", userDetails._id);
    formData.append("postId", postId);
    if (message.current) formData.append("message", message.current);
    if (visibility) formData.append("visibility", visibility);
    if (images.length) {
      images.forEach((image) => formData.append("image", image));
    }

    const response = await updateUserPost({
      url: `/post`,
      method: "PATCH",
      contentType: "multipart/form-data",
      payload: formData,
    });

    message.current = "";

    if (!response?.success || !response?.data?.success) return response;
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
    return response;
  };

  const hideAPost = async (postId: string) => {
    const response = await hidePostToUser({
      url: "post/hide-post",
      method: "PATCH",
      payload: {
        id: userDetails._id,
        postId,
      },
    });

    if (!response?.success || !response?.data?.success) return response;
    return response;
  };

  const deleteAPost = async (postId: string) => {
    const response = await deletePostData({
      url: "post",
      method: "DELETE",
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

  const deletePost = {
    loading: deletingPostData,
    makeRequest: deleteAPost,
  };

  const updatePost = {
    loading: updatingUserPost,
    makeRequest: updateAPost,
  };

  const hidePost = {
    loading: hidingPostToUser,
    makeRequest: hideAPost,
  };

  return {
    getPosts,
    createPost,
    reactToPost,
    deletePost,
    updatePost,
    hidePost,
  };
}
