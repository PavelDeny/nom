// src/lib/mongo/services/BookingService.ts
import { BaseCrudService } from "../BaseCrudService";
import { IBooking, BookingModel } from "../models/Booking";

export class BookingService extends BaseCrudService<IBooking> {
  constructor() {
    super(BookingModel);
  }

  /**
   * Находит все бронирования пользователя
   */
  async findByUser(userId: string) {
    return this.model.find({ userId }).sort({ startAt: -1 }).exec();
  }

  /**
   * Проверяет, занято ли место в указанный период
   */
  async isUnitAvailable(unitId: string, startAt: Date, endAt: Date) {
    const conflicting = await this.model
      .findOne({
        unitId,
        $or: [{ startAt: { $lt: endAt }, endAt: { $gt: startAt } }],
      })
      .lean()
      .exec();

    return !conflicting;
  }

  /**
   * Находит брони по юниту и дате (для проверки доступности)
   */
  async findByUnitAndDate(unitId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.model
      .find({
        unitId,
        $or: [{ startAt: { $lt: endOfDay }, endAt: { $gt: startOfDay } }],
      })
      .exec();
  }

  /**
   * Отменяет бронирование (обновляет статус)
   */
  async cancel(id: string) {
    return this.model
      .findByIdAndUpdate(id, { status: "cancelled" }, { new: true })
      .exec();
  }
}
