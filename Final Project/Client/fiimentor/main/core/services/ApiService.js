import { Postare } from '../domain/Postare';
//import { Mesaj } from '../domain/Mesaj';
import { Tutore } from '../domain/Tutore';
import { Profesor } from '../domain/Profesor';
import { Student } from '../domain/Student';
import { User } from '../domain/User';
import type { UserLogged } from '../../../global';

export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  serialNumber: string;
  username: string;
  password: string;
  email: string;
}

export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface CreateMessageRequest {
  senderId: number;
  receiverId: number[];
  content: string;
  isAnonymous: boolean;
}

export interface CreatePostRequest {
  senderId: number;
  receiverId: number[];
  title: string;
  content: string;
  isAnonymous: boolean;
}

export interface ApiService {
  registerUser(req: RegisterUserRequest): Promise<User>;

  loginUser(req: LoginUserRequest): Promise<UserLogged>;

  getUser(userId: string): Promise<User>;

  getStudent(studentId: string): Promise<Student>;

  getProfesor(profesorId:string): Promise<Profesor>;

  getTutore(tutoreId: string): Promise<Tutore>;

  createMessage(req: CreateMessageRequest): Promise<void>;

  getMessages():Promise<Mesaj[]>;

  createPost(req: CreatePostRequest): Promise<void>;

  getPosts():Promise<Postare[]>;
}
