import Image from "next/image";

export default function EditProfile() {
  return (
    <div>
      <h2>Edit Profile</h2>
      <div>
        <Image src="/assets/user.png" alt="user" width={104} height={104} />
        <Image src="/assets/upload.svg" alt="user" width={30} height={30} />
      </div>
      <div></div>
    </div>
  );
}
