import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_UserIdPostComment", ["userId"], {})
@Index("fk_PostIdPostComment", ["postId"], {})
@Entity("post_comment", { schema: "fiimentordb" })
export class PostComment {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", { name: "UserId", unsigned: true, default: () => "'0'" })
  userId: number;

  @Column("int", { name: "PostId", unsigned: true, default: () => "'0'" })
  postId: number;

  @Column("varchar", { name: "Content", length: 500, default: () => "'0'" })
  content: string;

  @Column("int", { name: "IsAnonymous", unsigned: true, default: () => "'0'" })
  isAnonymous: number;

  @Column("timestamp", { name: "Time", default: () => "CURRENT_TIMESTAMP" })
  time: Date;
}
