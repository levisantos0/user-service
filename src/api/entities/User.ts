import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "email", type: "varchar", nullable: false })
  email: string;

  @Column({ name: "password", type: "varchar", nullable: false })
  password: string;

  @Column({ name: "admin", type: "bool", nullable: true })
  admin: boolean;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    nullable: false,
  })
  updatedAt: Date;

  @Column({ name: "deleted_at", type: "timestamp", nullable: true })
  deletedAt: Date;
}
