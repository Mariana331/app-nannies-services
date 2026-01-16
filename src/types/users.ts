export type User = {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  name?: string;
};

export type RegistrationRequest = {
  name: string;
  email: string;
  password: string;
};
