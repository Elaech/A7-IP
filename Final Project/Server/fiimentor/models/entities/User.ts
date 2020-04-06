import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("SerialNumber", ["serialNumber"], { unique: true })
@Entity("user", { schema: "fiimentordb" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "Id", unsigned: true })
  id: number;

  @Column("varchar", {
    name: "SerialNumber",
    unique: true,
    length: 30,
    default: () => "'0'",
  })
  serialNumber: string;

  @Column("varchar", { name: "Username", length: 250, default: () => "'0'" })
  username: string;

  @Column("varchar", { name: "Password", length: 250, default: () => "'0'" })
  password: string;

  @Column("varchar", { name: "FirstName", length: 50, default: () => "'0'" })
  firstName: string;

  @Column("varchar", { name: "LastName", length: 50, default: () => "'0'" })
  lastName: string;

  @Column("varchar", { name: "Role", length: 10, default: () => "'0'" })
  role: string;

  @Column("varchar", {
    name: "Email",
    nullable: true,
    length: 100,
    default: () => "'0'",
  })
  email: string | null;
}
