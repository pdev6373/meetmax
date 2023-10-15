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
};

export type CheckMailType = {
  checkMailText: string;
  sendMailText: string;
  skipNowText: string;
  noEmailText: string;
  resendText: string;
};

export type GenderLabelType = "Male" | "Female";

export type GenderType = {
  id: "male" | "female";
  label: GenderLabelType;
};

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
  method: "POST" | "GET" | "PATCH" | "DELETE";
  payload: any;
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
  value: "public" | "friends" | "only-me";
};

export type PostType = {
  lastname: string;
  firstname: string;
  date: string;
  type: "Public" | "Friends" | "Only me";
  posterImage: string;
  noOfComments: string;
  // noOfShare: string;
  postImages?: string[];
  postText?: string;
  isFollowing: boolean;
  likes: PostLikesType[];
  isMine?: boolean;
};

export type CreatePostType = {
  onClose: any;
  setPostText: any;
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
  onLogout: any;
  onCancelLogout: any;
};

export type SettingsTextType = {
  children: string;
};

export type CommunityDataType = {
  image: string;
  firstname: string;
  lastname: string;
  job: string;
  social: string[];
  isFollowing: boolean;
  id: number;
};

export type CommunityType = {
  title: string;
  data: CommunityDataType[];
};

export type ProfileType = {
  isMine?: boolean;
};
