import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_UserIdGroupeMember", ["userId"], {})
@Index("fk_GroupeIdGroupeMember", ["groupeId"], {})
@Entity("groupe_member", { schema: "fiimentordb" })
export class GroupeMember {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", { name: "UserId", unsigned: true, default: () => "'0'" })
  userId: number;

  @Column("int", { name: "GroupeId", unsigned: true, default: () => "'0'" })
  groupeId: number;
}
