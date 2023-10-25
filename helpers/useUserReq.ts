import { useContext } from "react";
import { useAxiosPrivate } from "@/hooks";
import { AuthContext } from "@/context/authContext";

export default function useUserReq() {
  const { fetchData: fetchUser, loading: fetchingUser } = useAxiosPrivate();
  const { fetchData: updateUserData, loading: updatingUser } =
    useAxiosPrivate();
  const { fetchData: fetchSomeUsersData, loading: fetchingSomeUsersData } =
    useAxiosPrivate();
  const { fetchData: followUserAccount, loading: followingUserAccount } =
    useAxiosPrivate();
  const { fetchData: unfollowUserAccount, loading: unfollowingUserAccount } =
    useAxiosPrivate();
  const { fetchData: uploadProfilePics, loading: uploadingProfilePics } =
    useAxiosPrivate();
  const { fetchData: uploadCoverPics, loading: uploadingCoverPics } =
    useAxiosPrivate();
  const {
    userDetails: { userDetails, setUserDetails },
  } = useContext(AuthContext);

  const fetchAUser = async (id: string) => {
    const response = await fetchUser({
      url: `/user/${id}`,
      method: "GET",
    });

    if (!response?.success || !response?.data?.success) return response;
    return response;
  };

  const fetchSomeUsers = async (ids: string[]) => {
    const response = await fetchSomeUsersData({
      url: `/user/some-users/${ids.toString()}`,
      method: "GET",
    });

    if (!response?.success || !response?.data?.success) return response;
    return response;
  };

  const updateAUser = async (payload: any) => {
    const response = await updateUserData({
      url: `/user`,
      method: "PATCH",
      payload,
    });

    if (!response?.success || !response?.data?.success) return response;
    setUserDetails(response?.data?.data);
    return response;
  };

  const followAUser = async (followId: any) => {
    const response = await followUserAccount({
      url: `/user/follow-user`,
      method: "PATCH",
      payload: {
        id: userDetails._id,
        followId,
      },
    });

    if (!response?.success || !response?.data?.success) return response;
    setUserDetails(response?.data?.data);
    return response;
  };

  const unfollowAUser = async (unfollowId: any) => {
    const response = await unfollowUserAccount({
      url: `/user/unfollow-user`,
      method: "PATCH",
      payload: {
        id: userDetails._id,
        unfollowId,
      },
    });

    if (!response?.success || !response?.data?.success) return response;
    setUserDetails(response?.data?.data);
    return response;
  };

  const uploadUserProfilePicture = async (image: File) => {
    const formData = new FormData();
    formData.append("id", userDetails._id);
    formData.append("image", image);

    const response = await uploadProfilePics({
      url: "/user/profile-picture",
      method: "PATCH",
      contentType: "multipart/form-data",
      payload: formData,
    });

    if (!response?.success || !response?.data?.success) return response;
    setUserDetails(response?.data?.data);
    return response;
  };

  const uploadUserCoverPicture = async (image: File) => {
    const formData = new FormData();
    formData.append("id", userDetails._id);
    formData.append("image", image);

    const response = await uploadCoverPics({
      url: "/user/cover-picture",
      method: "PATCH",
      contentType: "multipart/form-data",
      payload: formData,
    });

    if (!response?.success || !response?.data?.success) return response;
    setUserDetails(response?.data?.data);
    return response;
  };

  const getUser = {
    loading: fetchingUser,
    makeRequest: fetchAUser,
  };

  const getSomeUsers = {
    loading: fetchingSomeUsersData,
    makeRequest: fetchSomeUsers,
  };

  const updateUser = {
    loading: updatingUser,
    makeRequest: updateAUser,
  };

  const followUser = {
    loading: followingUserAccount,
    makeRequest: followAUser,
  };

  const unfollowUser = {
    loading: unfollowingUserAccount,
    makeRequest: unfollowAUser,
  };

  const uploadProfilePicture = {
    loading: uploadingProfilePics,
    makeRequest: uploadUserProfilePicture,
  };

  const uploadCoverPicture = {
    loading: uploadingCoverPics,
    makeRequest: uploadUserCoverPicture,
  };

  return {
    getUser,
    updateUser,
    getSomeUsers,
    followUser,
    unfollowUser,
    uploadProfilePicture,
    uploadCoverPicture,
  };
}
