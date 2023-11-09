export interface StudentCreate {
  role_id: number;
  name: string;
  surname: string;
  jmbg: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  photoPath: string;
}
