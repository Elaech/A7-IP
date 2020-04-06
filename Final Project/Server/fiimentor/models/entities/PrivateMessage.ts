import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_SenderIdPrivateMessage", ["senderId"], {})
@Index("fk_ReceiverIdPrivateMessage", ["receiverId"], {})
@Entity("private_message", { schema: "fiimentordb" })
export class PrivateMessage {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", { name: "SenderId", unsigned: true, default: () => "'0'" })
  senderId: number;

  @Column("int", { name: "ReceiverId", unsigned: true, default: () => "'0'" })
  receiverId: number;

  @Column("varchar", { name: "Content", length: 500, default: () => "'0'" })
  content: string;

  @Column("int", { name: "IsAnonymous", default: () => "'0'" })
  isAnonymous: number;

  @Column("timestamp", { name: "Time", default: () => "CURRENT_TIMESTAMP" })
  time: Date;
}
