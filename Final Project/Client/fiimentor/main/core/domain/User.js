export class User {

  static nameConstraint = {
    min: 3,
    max: 50,
  };

  static passwordConstraint = {
    min: 6,
    max: 50,
  };

  static usernameConstraint = {
    min: 5,
    max: 50,
  };

  static emailPattern = new RegExp(/[a-zA-Z0-9_\\.\\+-]+@info.uaic.ro$/);

  static create(partial: Partial<User> = {}) {
    return new User(partial);
  }

  id: number;
  serialNumber: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  email: ?string;

  constructor(user: Partial<User>) {
    const { id, serialNumber, username, firstName, lastName, role, email } = user;

    this.id = id;
    this.serialNumber = serialNumber || '';
    this.username = username || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.role = role || '';
    this.email = email || '';
  }
}
