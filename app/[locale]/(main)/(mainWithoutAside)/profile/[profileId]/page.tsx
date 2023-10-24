import { Profile as ProfileComponent } from "@/components";
export default function Profile(param: any) {
  return <ProfileComponent id={param.params.profileId} />;
}
