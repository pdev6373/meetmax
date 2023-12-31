import { UserType } from "@/types";

export const userInitialValues: UserType = {
  _id: "",
  firstname: "",
  lastname: "",
  gender: null,
  dateOfBirth: null,
  email: "",
  isVerified: false,
  bio: "",
  phoneNumber: "",
  website: "",
  location: "",
  socialLinks: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  },
  profilePicture: "",
  coverPicture: "",
  followers: [],
  following: [],
  blockedUsers: [],
  canBefollowed: true,
  postVisibility: "everyone",
  profileVisibility: "everyone",
};

export const LANGUAGES = [
  { value: "af", text: "Afrikaans" },
  { value: "bn-BD", text: "Bengali" },
  { value: "ca", text: "Catalan" },
  { value: "da", text: "Danish" },
  { value: "nl", text: "Dutch" },
  { value: "en-GB", text: "English (UK)" },
  { value: "en-US", text: "English (US)" },
  { value: "es", text: "Espanol" },
  { value: "tl", text: "Tagalog" },
  { value: "fr-CA", text: "Francais (Canada)" },
  { value: "fr-FR", text: "Francais (France)" },
  { value: "de", text: "German" },
  { value: "id", text: "Indonesian" },
  { value: "ja", text: "Japanese" },
  { value: "ru", text: "Russian" },
  { value: "so", text: "Somali" },
  { value: "te", text: "Telugu" },
];

export const locales = LANGUAGES.map((language) => language.value);

export const NOTIFICATIONS: {
  image: string;
  title: string;
  time: string;
  type: "comment" | "like" | "follow";
  action: null | {
    isFollowing: boolean;
    details: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  isRead: boolean;
}[] = [
  {
    image: "/assets/user.png",
    title: "Yazdan Khan Commented on your photo.",
    time: "4 minutes ago",
    type: "comment",
    action: null,
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Pratap Vania Like your post “Need a logo..”",
    time: "3 minutes ago",
    type: "like",
    action: null,
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Hammadou Ibrahima Followed you",
    time: "3 hours ago",
    type: "follow",
    action: {
      isFollowing: false,
      details: {
        firstName: "",
        lastName: "",
        email: "",
      },
    },
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Hammadou Ibrahima Followed you",
    time: "3 hours ago",
    type: "follow",
    action: {
      isFollowing: true,
      details: {
        firstName: "",
        lastName: "",
        email: "",
      },
    },
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Yazdan Khan Commented on your photo.",
    time: "4 minutes ago",
    type: "comment",
    action: null,
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Pratap Vania Like your post “Need a logo..”",
    time: "3 minutes ago",
    type: "like",
    action: null,
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Hammadou Ibrahima Followed you",
    time: "3 hours ago",
    type: "follow",
    action: {
      isFollowing: false,
      details: {
        firstName: "",
        lastName: "",
        email: "",
      },
    },
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Hammadou Ibrahima Followed you",
    time: "3 hours ago",
    type: "follow",
    action: {
      isFollowing: true,
      details: {
        firstName: "",
        lastName: "",
        email: "",
      },
    },
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Yazdan Khan Commented on your photo.",
    time: "4 minutes ago",
    type: "comment",
    action: null,
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Pratap Vania Like your post “Need a logo..”",
    time: "3 minutes ago",
    type: "like",
    action: null,
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Hammadou Ibrahima Followed you",
    time: "3 hours ago",
    type: "follow",
    action: {
      isFollowing: false,
      details: {
        firstName: "",
        lastName: "",
        email: "",
      },
    },
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Hammadou Ibrahima Followed you",
    time: "3 hours ago",
    type: "follow",
    action: {
      isFollowing: true,
      details: {
        firstName: "",
        lastName: "",
        email: "",
      },
    },
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Yazdan Khan Commented on your photo.",
    time: "4 minutes ago",
    type: "comment",
    action: null,
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Pratap Vania Like your post “Need a logo..”",
    time: "3 minutes ago",
    type: "like",
    action: null,
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Hammadou Ibrahima Followed you",
    time: "3 hours ago",
    type: "follow",
    action: {
      isFollowing: false,
      details: {
        firstName: "",
        lastName: "",
        email: "",
      },
    },
    isRead: false,
  },
  {
    image: "/assets/user.png",
    title: "Hammadou Ibrahima Followed you",
    time: "3 hours ago",
    type: "follow",
    action: {
      isFollowing: true,
      details: {
        firstName: "",
        lastName: "",
        email: "",
      },
    },
    isRead: false,
  },
];
