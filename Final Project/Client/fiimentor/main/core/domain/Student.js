class Student extends User {

  static create(partial: Partial<Student>) {
    return new Student(partial);
  }

  studentId: number;
  group: string;
  tutorId: ?number;
  year: number;

  constructor(student: Partial<User> = {}) {
    super(student);

    const { studentId, group, tutorId, year } = student;

    this.studentId = studentId;
    this.group = group || '';
    this.tutorId = tutorId;
    this.year = year || '';
  }
}
