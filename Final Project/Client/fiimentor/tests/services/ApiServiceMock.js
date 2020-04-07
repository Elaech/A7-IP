import type {
  ApiService, CreateMessageRequest,
  LoginUserRequest,
  RegisterUserRequest
} from '../../main/core/services/ApiService';
import { User } from '../../main/core/domain/User';
import type { UserLogged } from '../../global';
import { Student } from '../../main/core/domain/Student';
import { Profesor } from '../../main/core/domain/Profesor';
import { Tutore } from '../../main/core/domain/Tutore';
import { Mesaj } from '../../main/core/domain/Mesaj';

export class ApiServiceMock implements ApiService {
  async registerUser(req: RegisterUserRequest): Promise<User> {
    return Promise.resolve(User.create());
  }

  async loginUser(req:LoginUserRequest):Promise<UserLogged> {
    return Promise.resolve();
  }

  async getUser(userId: number): Promise<User> {
    return Promise.resolve(User.create());
  }

  async getStudent(studentId: number): Promise<Student> {
    return Promise.resolve(Student.createStudent());
  }

  async getProfesor(profesorId: number): Promise<Profesor> {
    return Promise.resolve(Profesor.createProfesor());
  }

  async getTutore(tutoreId: number): Promise<Tutore> {
    return Promise.resolve(Tutore.createTutore());
  }

  async createMessage(req: CreateMessageRequest): Promise<void> {
    return Promise.resolve();
  }

  async getMessages(): Promise<Mesaj[]> {
    return Promise.resolve([]);
  }
}
