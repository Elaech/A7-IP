import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_UserIdCommentNotification", ["userId"], {})
@Index("fk_PostCommentIdNotification", ["postCommentId"], {})
@Entity("comment_notification", { schema: "fiimentordb" })
export class CommentNotification {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", { name: "UserId", unsigned: true, default: () => "'0'" })
  userId: number;

  @Column("int", {
    name: "PostCommentId",
    unsigned: true,
    default: () => "'0'",
  })
  postCommentId: number;

  @Column("int", { name: "Seen", unsigned: true, default: () => "'0'" })
  seen: number;
}
