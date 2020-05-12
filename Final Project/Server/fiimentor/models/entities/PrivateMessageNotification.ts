import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_UserIdPrivateMessageNotification", ["userId"], {})
@Index("fk_SenderIdPrivateMessageNotification", ["senderId"], {})
@Entity("private_message_notification", { schema: "fiimentordb" })
export class PrivateMessageNotification {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", { name: "UserId", unsigned: true, default: () => "'0'" })
  userId: number;

  @Column("int", { name: "SenderId", unsigned: true, default: () => "'0'" })
  senderId: number;

  @Column("int", { name: "Seen", unsigned: true, default: () => "'0'" })
  seen: number;
}
