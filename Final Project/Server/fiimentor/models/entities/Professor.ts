import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_UserIdProfessor", ["userId"], {})
@Entity("professor", { schema: "fiimentordb" })
export class Professor {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", { name: "UserId", unsigned: true, default: () => "'0'" })
  userId: number;

  @Column("varchar", { name: "AcademicRank", length: 50, default: () => "'0'" })
  academicRank: string;
}
