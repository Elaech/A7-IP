export interface ApiService {
  registerUser(req: RegisterUserRequest): Promise<User>;

  loginUser(req: LoginUserRequet): Promise<User>;

  getUser(userId: string): Promise<User>;

  getStudent(req:)
}
