// lib/typeorm/entities/User.ts
import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { ObjectId } from "mongodb"; // ← нативный ObjectId

@Entity("users")
@Index(["email"], { unique: true })
export class User {
  @ObjectIdColumn()
  _id!: ObjectId; // ← не ObjectID

  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column({ default: "guest" })
  role!: "guest" | "franchisee" | "admin";

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
