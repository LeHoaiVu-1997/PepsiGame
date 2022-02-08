export interface SignInResult {
  platform?: string;
  phone_number: string;
  name?: string;
}

export interface Credential {
  phone_number: string;
  name?: string;
}
