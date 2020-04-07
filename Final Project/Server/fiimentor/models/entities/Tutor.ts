import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_ProfessorIdTutor", ["professorId"], {})
@Index("fk_GroupeIdTutor", ["groupeId"], {})
@Entity("tutor", { schema: "fiimentordb" })
export class Tutor {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", {
    name: "ProfessorId",
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  professorId: number | null;

  @Column("int", {
    name: "GroupeId",
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  groupeId: number | null;
}
