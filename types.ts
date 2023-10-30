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
  params?: {
    locale: string;
  };
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
  editProfile: string;
  fullName: string;
  birthday: string;
  bio: string;
  enterYourBio: string;
  phoneNumberText: string;
  enterYourPhoneNumber: string;
  websiteText: string;
  enterYourWebsite: string;
  genderText: string;
  male: string;
  female: string;
  locationText: string;
  enterYourLocation: string;
  socialLink: string;
  yourUsername: string;
  facebookText: string;
  twitterText: string;
  instagramText: string;
  linkedinText: string;
  save: string;
  cancel: string;
  namesError: string;
  phoneNumberError: string;
  websiteError: string;
  linkError: string;
  anErrorOccurred: string;
  successText: string;
  defaultError: string;
};

export type PasswordAndSecurity = {
  changePasswordText: string;
  currentPasswordText: string;
  newPasswordText: string;
  retypePasswordText: string;
  successText: string;
  errorText: string;
  save: string;
  forgotPasswordText: string;
  defaultError: string;
  passwordError: string;
  invalidOldPassword: string;
  confirmPasswordError: string;
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
  checkSpam: string;
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
  post: PostDetailsType;
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

export type PostCommentType = {
  _id: string;
  id: string;
  message: string;
  likes: string[];
  createdAt: string;
  replies: PostReplyType[];
};

export type PostCommentExtendType = {
  _id: string;
  id: string;
  message: string;
  likes: string[];
  createdAt: string;
  replies: PostReplyType[];
  image: string;
};

export type PostReplyType = {
  _id: string;
  id: string;
  repliedComment: {
    firstname: string;
    lastname: string;
    message: string;
  };
  message: string;
  likes: string[];
  createdAt: string;
};

export type PostType = {
  createdAt: string;
  id: string;
  images: string[];
  likes: string[];
  message: string;
  visibility: VisibilityType;
  _id: string;
  comments: PostCommentType[];
  postTexts: PostTextsType;
  makePostText: MakePostTextsType;
  postFailed: string;
  postSuccess: string;
};

export type PostDetailsType = {
  createdAt: string;
  id: string;
  images: string[];
  likes: string[];
  message: string;
  visibility: VisibilityType;
  _id: string;
  comments: PostCommentType[];
};

export type CreatePostType = {
  onClose: any;
  postText: MutableRefObject<string>;
  view?: VisibilityType;
  type?: "new" | "edit";
  postId?: string;
  setPost?: any;
  profileId?: string;
  texts: MakePostTextsType;
  postSuccess: string;
  postFailed: string;
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
  logoutText: string;
  cancelText: string;
  confirmLogoutText: string;
};

export type SettingsTextType = {
  children: string;
};

export type ProfileType = {
  id?: string;
  editCoverPhoto: string;
  editPhoto: string;
  chooseAnImage: string;
  error: string;
  save: string;
  editBasicInfo: string;
  intro: string;
  postFailed: string;
  postSuccess: string;
  male: string;
  female: string;
  born: string;
  followers: string;
  follower: string;
  following: string;
  editDetails: string;
  facebook: string;
  twitter: string;
  instagram: string;
  imageSize: string;
  linkedin: string;
  follow: string;
  unfollow: string;
  noPostYet: string;
  noPostYetFollower: string;
  createPost: string;
  postTexts: PostTextsType;
  makePostTexts: MakePostTextsType;
  lockedToEveryone: string;
  lockedToNonfollowers: string;
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

export type SidebarTextsType = {
  feedText: string;
  communityText: string;
  notificationText: string;
  profileText: string;
  settingsText: string;
  logoutText: string;
  cancelText: string;
  logoutConfirmationText: string;
};

export type SettingsTextsType = {
  editProfile: string;
  language: string;
  passwordAndSecurity: string;
  viewingAndSharing: string;
  logoutText: string;
  cancelText: string;
  logoutConfirmationText: string;
};

export type MainLayoutType = {
  children: JSX.Element;
  params: {
    locale: string;
  };
};

export type ViewingAndSharingType = {
  viewingAndSharing: string;
  postVisibilityText: string;
  profileVisibilityText: string;
  whoCanFollow: string;
  everyone: string;
  followers: string;
  onlyMe: string;
  off: string;
  updateEror: string;
};

export type MakePostTextsType = {
  whatsHappening: string;
  addPhoto: string;
  postText: string;
  createAPost: string;
  visibleText: string;
  friends: string;
  public: string;
  onlyMe: string;
  update: string;
};

export type PostTextsType = {
  friends: string;
  public: string;
  onlyMe: string;
  deletePostText: string;
  deletePostQuestion: string;
  confirmDeletePost: string;
  cancel: string;
  deleteText: string;
  editPost: string;
  hidePost: string;
  postHidden: string;
  postHiddenDetails: string;
  follow: string;
  unfollow: string;
  confirmUnfollow: string;
  followSuccess: string;
  unfollowSuccess: string;
  error: string;
  noComments: string;
  comment: string;
  comments: string;
  like: string;
  liked: string;
  showComments: string;
  showComment: string;
  hideComment: string;
  hideComments: string;
  writeAComment: string;
  reply: string;
  you: string;
  replyingTo: string;
  postDeleteSuccess: string;
  commentSuccess: string;
  confirmUnfollowMale: string;
};
