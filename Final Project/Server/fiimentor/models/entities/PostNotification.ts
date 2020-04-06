import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_UserIdPostNotification", ["userId"], {})
@Index("fk_PostIdPostNotification", ["postId"], {})
@Entity("post_notification", { schema: "fiimentordb" })
export class PostNotification {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", { name: "UserId", unsigned: true, default: () => "'0'" })
  userId: number;

  @Column("int", { name: "PostId", unsigned: true, default: () => "'0'" })
  postId: number;

  @Column("int", { name: "Seen", unsigned: true, default: () => "'0'" })
  seen: number;
}
