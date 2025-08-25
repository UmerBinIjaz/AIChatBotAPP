export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  OTP: { email: string };
  ForgotPassword: undefined;
  ResetPassword: { email?: string };
  Chat: undefined;
};
