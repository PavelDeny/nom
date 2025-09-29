// lib/typeorm/services/UserService.ts
import { BaseCrudService } from "../BaseCrudService";
import { User } from "../entities/User";
import { getDataSource } from "../data-source";
import { Repository } from "typeorm";

export class UserService extends BaseCrudService<User> {
  constructor(repo: Repository<User>) {
    super(repo);
  }

  /**
   * Асинхронный фабричный метод для создания экземпляра UserService.
   * Используется в API routes и Server Components.
   */
  static async createInstance(): Promise<UserService> {
    const ds = await getDataSource();
    const repo = ds.getMongoRepository(User);
    return new UserService(repo);
  }

  /**
   * Находит пользователя по email.
   * @param email - email пользователя
   * @returns User | null
   */
  async findByEmail(email: string): Promise<User | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.repo.findOne({ where: { email } } as any);
  }
}
