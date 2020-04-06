import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_OwnerIdGroupe", ["ownerId"], {})
@Entity("groupe", { schema: "fiimentordb" })
export class Groupe {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("int", { name: "OwnerId", unsigned: true, default: () => "'0'" })
  ownerId: number;

  @Column("varchar", { name: "Title", length: 50, default: () => "'0'" })
  title: string;
}
