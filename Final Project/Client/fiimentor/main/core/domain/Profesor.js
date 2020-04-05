class Profesor extends User {
  static create(partial :Partial<Profesor>) {
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
