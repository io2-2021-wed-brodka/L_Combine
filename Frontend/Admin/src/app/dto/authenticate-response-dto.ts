export interface AuthenticateResponseDTO {
  token: string;
  role: Role;
}

export enum Role {
  Admin = 'admin',
  User = 'user',
  Tech = 'tech'
}
