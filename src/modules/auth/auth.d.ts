export type User = {
  id: number;
  email: string;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type DecodedRefreshToken = {
  sub: number;
  email: string;
  iat: number;
  exp: number;
};
