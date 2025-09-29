// lib/mongo/services/UserService.ts
import { BaseCrudService } from "../BaseCrudService";
import { IUser, UserModel } from "../models/User";

export class UserService extends BaseCrudService<IUser> {
  constructor() {
    super(UserModel);
  }

  // Example of custom domain logic
  async findByEmail(email: string) {
    return this.model.findOne({ email }).exec();
  }
}
