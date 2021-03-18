export class UserModel {
  id: number;
  email: string;
  password: string;
  created: Date;

  constructor(id: number, email: string, password: string, created: Date) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.created = created;
  }
}
