import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_UserIdPost", ["userId"], {})
@Index("fk_GroupeIdPost", ["groupeId"], {})
@Entity("post", { schema: "fiimentordb" })
export class Post {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", { name: "UserId", unsigned: true, default: () => "'0'" })
  userId: number;

  @Column("int", { name: "GroupeId", unsigned: true, default: () => "'0'" })
  groupeId: number;

  @Column("varchar", { name: "Title", length: 250, default: () => "'0'" })
  title: string;

  @Column("varchar", { name: "Content", length: 500, default: () => "'0'" })
  content: string;

  @Column("int", { name: "IsAnonymous", default: () => "'0'" })
  isAnonymous: number;

  @Column("timestamp", {
    name: "Time",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  time: Date | null;
}
