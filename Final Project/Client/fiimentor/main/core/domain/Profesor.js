import { User } from './User';

export class Profesor extends User {
  static createProfesor(partial :Partial<Profesor>) {
    return new Profesor(partial);
  }

  academicRank: string;
  professorId: number;

  constructor(profesor: Partial<Profesor> = {}) {
    super(profesor);
    const { academicRank, professorId } = profesor;

    this.academicRank = academicRank || '';
    this.professorId = professorId;
  }
}
