export interface SignInResult {
  phone_number: string;
  name?: string;
}

export interface SignUpResult {
  note?: string;
  success: boolean;
  data: any;
}

export interface Credential {
  phone_number: string;
  name?: string;
}
