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
import { Postare } from '../core/domain/Postare';
import type { UserLogged } from '../../global';

export class HttpApiService implements ApiService{
  axiosService: AxiosService;
  axiosServiceToken: AxiosService;

  constructor() {
    this.axiosService = new AxiosService({
      baseURL: 'http://localhost:8000',
    })
    this.axiosServiceToken = new AxiosService({
      baseURL: 'http://localhost:8000',
      headers: {
        authorization: '',
      },
    })
  }

  setUserAuthorizer(authorizer: string) {
    this.axiosServiceToken = new AxiosService({
      baseURL: 'http://localhost:8000',
      headers: {
        Authorization: `Bearer ${authorizer}`,
      },
    });
  }
  async registerUser(req: RegisterUserRequest): Promise<User> {
   return this.axiosService.post('/api/auth/register',req);
  }

  async loginUser(req:LoginUserRequest):Promise<UserLogged> {
    return this.axiosService.post('/api/auth/login',req);
  }

  async getUser(userId: number): Promise<User> {
    return this.axiosService.get(`/user/${userId}`);
  }

  async getStudent(studentId: number): Promise<Student> {
    return this.axiosService.get(`/user/${studentId}`);
  }

  async getProfesor(profesorId: number): Promise<Profesor> {
    return this.axiosService.get(`/user/${profesorId}`);
  }

  async getProfesori(autorizer: string): Promise<Profesor[]> {
    this.setUserAuthorizer(autorizer);
    return this.axiosServiceToken.get('api/professor/professor_list');
  }

  async getTutore(tutoreId: number): Promise<Tutore> {
    return this.axiosService.get(`/user/${tutoreId}`);
  }
  async createPost(req: CreatePostRequest): Promise<void> {
    return this.axiosService.post('/post',req);
  }

  async getPosts(): Promise<Postare[]> {
    return this.axiosService.get('/post');
  }
}
