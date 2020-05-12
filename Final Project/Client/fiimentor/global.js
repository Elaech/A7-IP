import { Student } from './main/core/domain/Student';
import { Profesor } from './main/core/domain/Profesor';
import { Tutore } from './main/core/domain/Tutore';

export type UserLogged = Student | Profesor | Tutore;
