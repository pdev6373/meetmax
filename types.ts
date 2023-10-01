import {
  ReactNode,
  Dispatch,
  HTMLInputTypeAttribute,
  SetStateAction,
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
  children: string;
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
};

export type SearchType = {
  placeholder: string;
  value: string;
  onChange: any;
};

type ValuePiece = Date | null;
export type CalendarValueType = ValuePiece | [ValuePiece, ValuePiece];
export type CalendarType = {
  onClose: any;
  onSave: any;
  setValue: Dispatch<SetStateAction<CalendarValueType>>;
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
};
