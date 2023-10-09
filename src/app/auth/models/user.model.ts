export class User {
  username: string;
  password: string;
  _token: string;
  data?: { name: string; token: string };

  constructor(username: string, password: string, _token: string) {
    this.username = username;
    this.password = password;
    this._token = _token;
  }
}
