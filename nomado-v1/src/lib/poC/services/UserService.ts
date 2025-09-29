// src/lib/poC/services/UserService.ts
import { getRepo } from "@/lib/repos/repoFactory";
import { IRepo } from "@/lib/repos/wrappers";

export interface User {
  _id?: string;
  email: string;
  name: string;
  role: "guest" | "franchisee" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreateInput {
  email: string;
  name: string;
  role?: "guest" | "franchisee" | "admin";
}

export interface UserUpdateInput {
  email?: string;
  name?: string;
  role?: "guest" | "franchisee" | "admin";
}

export class UserService {
  repo: IRepo<User>;
  
  constructor(repo: IRepo<User>) {
    this.repo = repo;
  }

  static async createInstance(preference: "typeorm" | "mongoose" = "typeorm"): Promise<UserService> {
    const repo = await getRepo<User>("User", { preference });
    return new UserService(repo);
  }

  async create(input: UserCreateInput): Promise<User> {
    return this.repo.create(input);
  }

  async findMany(opts: { page?: number; pageSize?: number } = {}): Promise<{ items: User[]; total: number }> {
    return this.repo.findMany({}, opts);
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findById(id);
  }

  async updateById(id: string, updates: UserUpdateInput): Promise<User | null> {
    return this.repo.updateById(id, updates);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.repo.deleteById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    // Use findMany with email filter
    const res = await this.repo.findMany({ email }, { page: 1, pageSize: 1 });
    return (res.items && res.items[0]) || null;
  }
}
