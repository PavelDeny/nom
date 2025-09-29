import { getRepo } from '@/lib/repos/repoFactory';
// import { InternalError } from '@/lib/utils/errors'; // TODO: Fix import

export interface SearchFilters {
  location?: string;
  dateFrom?: Date;
  dateTo?: Date;
  capacity?: number;
  amenities?: string[];
  priceRange?: {
    min?: number;
    max?: number;
  };
}

export interface SearchResult {
  spaces: unknown[];
  total: number;
  filters: SearchFilters;
}

export class SearchService {
  private spaceRepo: { findMany: (query: unknown, opts?: { page?: number; pageSize?: number; sort?: Record<string, 1 | -1>; limit?: number; projection?: Record<string, 0 | 1> }) => Promise<{ items: unknown[]; total: number }> };

  constructor(spaceRepo: { findMany: (query: unknown, opts?: { page?: number; pageSize?: number; sort?: Record<string, 1 | -1>; limit?: number; projection?: Record<string, 0 | 1> }) => Promise<{ items: unknown[]; total: number }> }) {
    this.spaceRepo = spaceRepo;
  }

  static async createInstance(): Promise<SearchService> {
    try {
      // Получаем репозиторий Space с помощью фабрики репозиториев
      // Получаем репозиторий Space с помощью фабрики репозиториев
      const spaceRepo = await getRepo('Space', { preference: 'typeorm' });

      // Приводим тип репозитория к ожидаемому интерфейсу с методом findMany
      const typedSpaceRepo: { findMany: (query: Record<string, unknown>, opts?: { page?: number; pageSize?: number; sort?: Record<string, 1 | -1>; limit?: number; projection?: Record<string, 0 | 1> }) => Promise<{ items: unknown[]; total: number }> } = spaceRepo as { findMany: (query: Record<string, unknown>, opts?: { page?: number; pageSize?: number; sort?: Record<string, 1 | -1>; limit?: number; projection?: Record<string, 0 | 1> }) => Promise<{ items: unknown[]; total: number }> };

      // Приводим репозиторий к ожидаемому интерфейсу с универсальными параметрами
      // Оборачиваем метод findMany, чтобы привести параметры к типу unknown
      const compatibleRepo = {
        findMany: (query: unknown, opts?: { page?: number; pageSize?: number; sort?: Record<string, 1 | -1>; limit?: number; projection?: Record<string, 0 | 1> }) => {
          // typedSpaceRepo ожидает query как Record<string, unknown> и opts с определённой структурой
          // Здесь делаем приведение типов для совместимости
          return typedSpaceRepo.findMany(
            query as Record<string, unknown>,
            opts as { page?: number; pageSize?: number; sort?: Record<string, 1 | -1>; limit?: number; projection?: Record<string, 0 | 1> }
          );
        }
      };

      // Возвращаем новый экземпляр SearchService с совместимым репозиторием
      return new SearchService(compatibleRepo);
    } catch (error) {
      // Используем стандартную ошибку, если InternalError не определён
      throw new Error('Failed to initialize SearchService: ' + (error instanceof Error ? error.message : String(error)));
    }
  }

  async searchSpaces(filters: SearchFilters = {}): Promise<SearchResult> {
    try {
      const query: Record<string, unknown> = {};

      // Location filter
      if (filters.location) {
        query.location = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: this.parseCoordinates(filters.location)
            },
            $maxDistance: 10000 // 10km radius
          }
        };
      }

      // Capacity filter
      if (filters.capacity) {
        query.capacity = { $gte: filters.capacity };
      }

      // Price range filter
      if (filters.priceRange) {
        // Создаём объект pricePerDay только если min или max определены, чтобы избежать ошибок типов
        if (filters.priceRange.min !== undefined || filters.priceRange.max !== undefined) {
          // Объявляем pricePerDay как объект с возможными полями $gte и $lte
          const pricePerDay: Record<string, number> = {};
          if (filters.priceRange.min !== undefined) {
            pricePerDay.$gte = filters.priceRange.min;
          }
          if (filters.priceRange.max !== undefined) {
            pricePerDay.$lte = filters.priceRange.max;
          }
          query.pricePerDay = pricePerDay;
        }
      }

      // Amenities filter
      if (filters.amenities && filters.amenities.length > 0) {
        query.amenities = { $all: filters.amenities };
      }

      const result = await this.spaceRepo.findMany(query, {
        limit: 50,
        sort: { createdAt: -1 }
      });

      return {
        spaces: result.items || [],
        total: result.total || 0,
        filters
      };
    } catch (error) {
      throw new Error('Search failed');
    }
  }

  async searchSpacesByLocation(location: string, radiusKm: number = 10): Promise<unknown[]> {
    try {
      const coordinates = this.parseCoordinates(location);
      
      const query = {
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates
            },
            $maxDistance: radiusKm * 1000 // Convert to meters
          }
        }
      };

      const result = await this.spaceRepo.findMany(query, {
        limit: 20,
        sort: { createdAt: -1 }
      });

      return result.items || [];
    } catch (error) {
      throw new Error('Location search failed');
    }
  }

  async getAvailableSpaces(dateFrom: Date, dateTo: Date, location?: string): Promise<unknown[]> {
    try {
      // This would typically involve checking availability
      // For now, return all spaces that match location criteria
      const query: Record<string, unknown> = {};
      
      if (location) {
        const coordinates = this.parseCoordinates(location);
        query.location = {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates
            },
            $maxDistance: 50000 // 50km radius for availability search
          }
        };
      }

      const result = await this.spaceRepo.findMany(query, {
        limit: 100,
        sort: { createdAt: -1 }
      });

      // Возвращаем найденные элементы или пустой массив, если ничего не найдено
      return result.items || [];
    } catch (error) {
      // Используем стандартный Error, так как InternalError не определён
      throw new Error('Availability search failed');
    }
  }

  private parseCoordinates(location: string): [number, number] {
    // Simple coordinate parsing - in real app would use geocoding service
    // Format: "lat,lng" or "lat,lng" with spaces
    const coords = location.split(',').map(c => parseFloat(c.trim()));
    // Проверяем, что координаты корректны: должно быть два числа (широта и долгота)
    if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
      // Используем стандартный Error, так как InternalError не определён
      throw new Error('Invalid location format. Expected "lat,lng"');
    }

    // Возвращаем координаты в формате [долгота, широта], как ожидает MongoDB
    return [coords[1], coords[0]];
  }

  /**
   * Получить предложения для поиска по названию, описанию или локации пространства.
   * @param query Строка поиска, введённая пользователем.
   * @returns Массив уникальных строк-подсказок (до 5 штук).
   */
  async getSearchSuggestions(query: string): Promise<string[]> {
    try {
      // Простой текстовый поиск по названию, описанию и названию локации
      const searchQuery = {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { locationName: { $regex: query, $options: 'i' } }
        ]
      };

      const result = await this.spaceRepo.findMany(searchQuery, {
        limit: 10,
        projection: { name: 1, locationName: 1 }
      });

      // Extract unique suggestions
      const suggestions = new Set<string>();
      result.items.forEach((space: unknown) => {
        if ((space as { name?: string }).name) suggestions.add((space as { name: string }).name);
        if ((space as { locationName?: string }).locationName) suggestions.add((space as { locationName: string }).locationName);
      });

      return Array.from(suggestions).slice(0, 5);
    } catch (error) {
      throw new Error('Search suggestions failed');
    }
  }
}
