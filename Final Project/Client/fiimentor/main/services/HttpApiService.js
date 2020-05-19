import {AxiosService} from './AxiosService';
import {
  ApiService,
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
} from '../core/services/ApiService';
import {User} from '../core/domain/User';
import { Student } from '../core/domain/Student';
import { Profesor } from '../core/domain/Profesor';
import { Tutore } from '../core/domain/Tutore';
import { Postare } from '../core/domain/Postare';
import { Comment } from '../core/domain/Comment';
import type { UserLogged } from '../../global';
import type {CreateCommentRequest, CreatePostRequest, SearchRequest} from '../core/services/ApiService';

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

  async getGrupeMentorat(autorizer: string): Promise<any> {
    this.setUserAuthorizer(autorizer);
    return this.axiosServiceToken.get('api/groupe/tutor_groupe_list');
  }

  async getTutore(tutoreId: number): Promise<Tutore> {
    return this.axiosService.get(`/user/${tutoreId}`);
  }
  async createPost(req: CreatePostRequest): Promise<void> {
    return this.axiosServiceToken.post('api/post',req);
  }

  async getPost(postId: number, authorizer: string): Promise<Postare[]> {
    this.setUserAuthorizer(authorizer);
    return this.axiosServiceToken.get(`api/post/${postId}`);
  }

  async getPrivateMessage(pmessageId: number, authorizer: string) {
  this.setUserAuthorizer(authorizer);
  return this.axiosServiceToken.get(`api/pmessage/${pmessageId}`);
  }

  async searchPost(req: SearchRequest, authorizer: string) : Promise<Postare[]>{
    this.setUserAuthorizer(authorizer);
    return this.axiosServiceToken.post('api/post/getPosts', req);
  }


  async createComment(req: CreateCommentRequest, authorizer: string): Promise<void> {
    this.setUserAuthorizer(authorizer);
    return this.axiosServiceToken.post('api/comment', req);
  }

  async getComments(): Promise<Comment[]> {
    return this.axiosService.get('/comment');
  }

  async updateUser(req:UpdateUserRequest, authorizer: string): Promise<User>{
    this.setUserAuthorizer(authorizer);
    return this.axiosServiceToken.post('/api/register/role',req);
  }

  async getNotifications(authorizer: string): Promise<Postare[]> {
    this.setUserAuthorizer(authorizer);
    return this.axiosServiceToken.get('/api/notification');
  }
}
