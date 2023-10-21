import { useContext } from "react";
import { useAxiosPrivate } from "@/hooks";
import { AuthContext } from "@/context/authContext";

export default function useUserReq() {
  const { fetchData: fetchUser, loading: fetchingUser } = useAxiosPrivate();
  const { fetchData: updateUserData, loading: updatingUser } =
    useAxiosPrivate();
  const { fetchData: fetchSomeUsersData, loading: fetchingSomeUsersData } =
    useAxiosPrivate();
  const {
    userDetails: { userDetails },
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

  return { getUser, updateUser, getSomeUsers };
}
