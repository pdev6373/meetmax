import {
  ReactNode,
  Dispatch,
  HTMLInputTypeAttribute,
  SetStateAction,
  MutableRefObject,
} from "react";

export type PageProps = {
  params: {
    locale: string;
  };
};

export type RootLayoutType = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export type LayoutType = {
  children: ReactNode;
};

export type AlertType = {
  children: string;
  open: "yes" | "no" | "wait";
  setOpen: Dispatch<SetStateAction<"yes" | "no" | "wait">>;
  isDanger?: boolean;
};

export type TextType = {
  children: string;
  type: "heading" | "sub-heading";
  capitalize?: boolean;
};

export type BodyTextType = {
  children: string;
  type: "error";
  center?: boolean;
};

export type LanguageType = {
  value: string;
  text: string;
};

export type ButtonType = {
  children: string | JSX.Element;
  icon?: string;
  type: "social" | "submit";
  onClick?: any;
  isLoading?: boolean;
  variation?: "normal" | "small";
  disabled?: boolean;
};

export type InputType = {
  icon: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder: string;
  actionIcon?: string;
  onActionIconClick?: () => any;
  type: HTMLInputTypeAttribute;
  isDisabled?: boolean;
  errorComponent?: JSX.Element | null;
};

export type SocialButtonType = {
  text: string;
  icon: string;
  clickHandler: any;
};

export type FormButtonTextType = {
  text: string;
  actionText: string;
  onActionTextClick: () => any;
  actionType: "link" | "button";
  mainform: boolean;
  loading?: boolean;
};

export type SearchType = {
  placeholder: string;
  value: string;
  onChange: any;
  reverse?: boolean;
};

type ValuePiece = Date | null;
export type CalendarValueType = ValuePiece | [ValuePiece, ValuePiece];
export type CalendarType = {
  onClose: any;
  onSave: any;
  setValue: Dispatch<SetStateAction<CalendarValueType>>;
  save: string;
  cancel: string;
};

export type LoginFormType = {
  emailPlaceholder: string;
  passwordPlaceholder: string;
  rememberText: string;
  forgotPasswordText: string;
  noAccountText: string;
  signupText: string;
  signinText: string;
  defaultError: string;
  emailError: string;
  passwordError: string;
};

export type EditProfileType = {
  defaultError: string;
  emailError: string;
  namesError: string;
  save: string;
  cancel: string;
  male: string;
  female: string;
};

export type LocaleType = {
  locale: string;
  short?: boolean;
};

export type SettingsLanguageType = {
  params: LocaleType;
};

export type ForgotPasswordFormType = {
  emailPlaceholder: string;
  buttonText: string;
  backText: string;
  defaultError: string;
  emailError: string;
};

export type ResetPasswordFormType = {
  newPasswordPlaceholder: string;
  confirmNewPasswordPlaceholder: string;
  buttonText: string;
  backText: string;
  defaultError: string;
  passwordError: string;
  confirmPasswordError: string;
  token: string;
};

export type CheckMailType = {
  checkMailText: string;
  sendMailText: string;
  skipNowText: string;
  noEmailText: string;
  resendText: string;
};

export type GenderType = "Male" | "Female";

export type SignupFormType = {
  emailPlaceholder: string;
  namePlaceholder: string;
  passwordPlaceholder: string;
  dateOfBirthPlaceholder: string;
  male: string;
  female: string;
  hasAccountText: string;
  signinText: string;
  signupText: string;
  defaultError: string;
  emailError: string;
  namesError: string;
  passwordError: string;
  save: string;
  cancel: string;
};

export type SocialLoginType = {
  googleText: string;
  appleText: string;
};

export type FetchType = {
  url: string;
  method?: "POST" | "GET" | "PATCH" | "DELETE";
  payload?: any;
  credentials?: "include" | "same-origin" | "omit";
  contentType?: "application/json" | "multipart/form-data";
  token?: string;
};

export type ReactorsType = {
  images: string[];
  noOfReactions: string;
};

export type PostLikesType = {
  email: string;
  firstname: string;
  lastname: string;
  image: string;
};

export type PostViewType = {
  type: "Public" | "Friends" | "Only me";
  value: VisibilityType;
};

export type PostType = {
  createdAt: string;
  id: string;
  images: string[];
  likes: string[];
  message: string;
  visibility: VisibilityType;
  _id: string;
};

export type CreatePostType = {
  onClose: any;
  postText: MutableRefObject<string>;
};

export type SwtichType = {
  onClick: any;
  state: "on" | "off";
};

export type FriendsOptionsType = {
  icon: string;
  text: string;
  state: "on" | "off";
};

export type LogoutType = {
  onCancelLogout: any;
};

export type SettingsTextType = {
  children: string;
};

export type ProfileType = {
  isMine?: boolean;
};

export type UserType = {
  _id: string;
  firstname: string;
  lastname: string;
  gender: "Male" | "Female" | null;
  dateOfBirth: string | null;
  email: string;
  isVerified: boolean;
  bio: string;
  phoneNumber: string;
  website: string;
  location: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  profilePicture: string;
  coverPicture: string;
  followers: string[];
  following: string[];
  blockedUsers: string[];
  postVisibility: VisibilityType;
  profileVisibility: VisibilityType;
  canBefollowed: boolean;
};

export type DataType = {
  success: boolean;
  message: string;
  data: any;
};

export type VisibilityType = "everyone" | "followers" | "me";
