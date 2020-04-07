import {AxiosService} from './AxiosService';
import {
  ApiService,
  CreateMessageRequest,
  LoginUserRequest,
  RegisterUserRequest,
} from '../core/services/ApiService';
import {User} from '../core/domain/User';
import { Student } from '../core/domain/Student';
import { Profesor } from '../core/domain/Profesor';
import { Tutore } from '../core/domain/Tutore';
import { Mesaj } from '../core/domain/Mesaj';
import type { UserLogged } from '../../global';

export class HttpApiService implements ApiService{
  axiosService: AxiosService;

  constructor() {
    this.axiosService = new AxiosService({
      /*baseUrl=*/
    })
  }

  async registerUser(req: RegisterUserRequest): Promise<User> {
   return this.axiosService.post<RegisterUserRequest, User>('/user',req);
  }

  async loginUser(req:LoginUserRequest):Promise<UserLogged> {
    return this.axiosService.post<LoginUserRequest,UserLogged>('/user/login',req);
  }

  async getUser(userId: number): Promise<User> {
    return this.axiosService.get<number, User>(`/user/${userId}`);
  }

  async getStudent(studentId: number): Promise<Student> {
    return this.axiosService.get<number, Student>(`/user/${studentId}`);
  }

  async getProfesor(profesorId: number): Promise<Profesor> {
    return this.axiosService.get<number, Profesor>(`/user/${profesorId}`);
  }

  async getTutore(tutoreId: number): Promise<Tutore> {
    return this.axiosService.get<number, Tutore>(`/user/${tutoreId}`);
  }

  async createMessage(req: CreateMessageRequest): Promise<void> {
    return this.axiosService.post<CreateMessageRequest, void>('/message',req);
  }

  async getMessages(): Promise<Mesaj[]> {
    return this.axiosService.get<void, Mesaj[]>('/message');
  }
}
