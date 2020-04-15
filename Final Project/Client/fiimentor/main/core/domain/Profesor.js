import { User } from './User';

export class Profesor extends User {
  static createProfesor(partial :Partial<Profesor>) {
    return new Profesor(partial);
  }

  academicRank: string;

  constructor(profesor: Partial<Profesor> = {}) {
    super(profesor);
    const { academicRank } = profesor;

    this.academicRank = academicRank || '';
  }
}
