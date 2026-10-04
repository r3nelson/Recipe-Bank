export type User = {
  id: number;
  email: string;
  name: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserCreate = {
  email: string;
  password: string;
};

export type Token = {
  access_token: string;
  token_type: string;
};
