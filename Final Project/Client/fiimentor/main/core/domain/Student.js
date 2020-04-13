import { User } from './User';

export class Student extends User {

  static createStudent(partial: Partial<Student>) {
    return new Student(partial);
  }

  studentId: number;
  group: string;
  tutorId: ?number;
  year: number;

  constructor(student: Partial<Student> = {}) {
    super(student);

    const { studentId, group, tutorId, year } = student;

    this.studentId = studentId;
    this.group = group || '';
    this.tutorId = tutorId;
    this.year = year || '';
  }
}
