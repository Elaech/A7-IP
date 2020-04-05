import { User } from './User';

export class Profesor extends User {
  static createProfesor(partial :Partial<Profesor>) {
    return new Profesor(partial);
  }

  profesorId: number;
  title: string;

  constructor(profesor: Partial<Profesor> = {}) {
    super(profesor);
    const { profesorId, title } = profesor;

    this.profesorId = profesorId;
    this.title = title || '';
  }
}
