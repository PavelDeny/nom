// src/lib/poC/services/BookingService.ts
import { getRepo } from "@/lib/repos/repoFactory";
import { IRepo } from "@/lib/repos/wrappers";

export interface Booking {
  _id?: string;
  userId: string;
  spaceId: string;
  unitId: string;
  startAt: Date;
  endAt: Date;
  durationMinutes: number;
  type: "hourly" | "day" | "week" | "month";
  price: number;
  currency: string;
  status: "pending" | "confirmed" | "cancelled" | "refunded";
  paymentIntentId?: string;
  receiptUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookingCreateInput {
  userId: string;
  spaceId: string;
  unitId: string;
  startAt: Date;
  endAt: Date;
  durationMinutes: number;
  type: "hourly" | "day" | "week" | "month";
  price: number;
  currency: string;
  status?: "pending" | "confirmed" | "cancelled" | "refunded";
  paymentIntentId?: string;
  receiptUrl?: string;
}

export interface BookingUpdateInput {
  status?: "pending" | "confirmed" | "cancelled" | "refunded";
  paymentIntentId?: string;
  receiptUrl?: string;
}

export class BookingService {
  repo: IRepo<Booking>;
  
  constructor(repo: IRepo<Booking>) {
    this.repo = repo;
  }

  static async createInstance(preference: "typeorm" | "mongoose" = "typeorm"): Promise<BookingService> {
    const repo = await getRepo<Booking>("Booking", { preference });
    return new BookingService(repo);
  }

  async create(input: BookingCreateInput): Promise<Booking> {
    return this.repo.create(input);
  }

  async findMany(opts: { page?: number; pageSize?: number } = {}): Promise<{ items: Booking[]; total: number }> {
    return this.repo.findMany({}, opts);
  }

  async findById(id: string): Promise<Booking | null> {
    return this.repo.findById(id);
  }

  async updateById(id: string, updates: BookingUpdateInput): Promise<Booking | null> {
    return this.repo.updateById(id, updates);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.repo.deleteById(id);
  }

  // additional booking-specific helpers can be added here
}
