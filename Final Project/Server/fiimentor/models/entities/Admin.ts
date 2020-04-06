import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_userIdAdmin", ["userId"], {})
@Entity("admin", { schema: "fiimentordb" })
export class Admin {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", { name: "UserId", unsigned: true, default: () => "'0'" })
  userId: number;
}
