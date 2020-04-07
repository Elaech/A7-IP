import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_ProfessorIdTutor", ["tutorId"], {})
@Index("fk_UserIdStudent", ["userId"], {})
@Entity("student", { schema: "fiimentordb" })
export class Student {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", { name: "UserId", unsigned: true, default: () => "'0'" })
  userId: number;

  @Column("varchar", { name: "Groupe", length: 5, default: () => "'0'" })
  groupe: string;

  @Column("int", { name: "Year", unsigned: true, default: () => "'0'" })
  year: number;

  @Column("int", {
    name: "TutorId",
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  tutorId: number | null;
}
