import {Comment} from '../domain/Comment';
import {Postare} from '../domain/Postare';
import {Tutore} from '../domain/Tutore';
import {Profesor} from '../domain/Profesor';
import {Student} from '../domain/Student';
import {User} from '../domain/User';
import type {UserLogged} from '../../../global';


type RecipientsPost = 'All' | 'Professors' | 'Groupe';

interface ProfessorsPost {
    recipient: string;
    professorId?: number;
}

interface GroupePost {
    year?: number;
    letter?: string;
    number?: number;
    groupeId?: number;
}


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
    recipients: RecipientsPost;
    title: string;
    content: string;
    isAnonymous: boolean;
    professors?: ProfessorsPost;
    groupe?: GroupePost;
}

export interface CreateCommentRequest {
    postId: number;
    pmessageId: number;
    content: string;
    isAnonymous: false;
}

export interface SearchRequest {
    query: string;
    page: ' ';
    size: number;
    filters: Filters;
}

export interface Filters {
    toFrom: ProfessorsPost & GroupePost;
    postedByMe: boolean;
    isAnonymous: boolean;

}

export interface ApiService {
    registerUser(req: RegisterUserRequest): Promise<User>;

    loginUser(req: LoginUserRequest): Promise<UserLogged>;

    getUser(userId: string): Promise<User>;

    getStudent(studentId: string): Promise<Student>;

    getProfesor(profesorId: string): Promise<Profesor>;

    getTutore(tutoreId: string): Promise<Tutore>;

    getProfesori(authorizer: string): Promise<Profesor[]>;

    getGrupeMentorat(autorizer: string): Promise<any>;

    createPost(req: CreatePostRequest): Promise<void>;

    getPost(postId: number, authorizer: string): Promise<Postare>;

    getPrivateMessage(pmessageId: number, authorizer: string): Promise<Postare>;

    createComment(req: CreateCommentRequest): Promise<void>;

    getComments(): Promise<Comment[]>;
    
    searchPost(req: SearchRequest, authorizer: string) : Promise<Postare[]>;

}
