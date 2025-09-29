// app/users-typeorm/page.tsx
import { UserService } from "@/lib/typeorm/services/UserService";
import { User } from "@/lib/typeorm/entities/User"; // ← добавь импорт

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  let items: User[] = []; // ← вместо any[]
  let loadError = false;

  try {
    const service = await UserService.createInstance();
    const result = await service.findMunknown({
      pagination: { page: 1, pageSize: 20 },
    });
    items = result.items;
  } catch (error) {
    console.error("Failed to load users (TypeORM):", error);
    loadError = true;
  }

  return (
    <main>
      <h1>Users (TypeORM)</h1>

      {loadError ? (
        <p>Ошибка загрузки данных. Повторите попытку позже.</p>
      ) : items.length === 0 ? (
        <p>Пока нет пользователей.</p>
      ) : (
        <ul>
          {items.map(
            (
              u, // ← u теперь имеет тип User, не нужен : any
            ) => (
              <li key={String(u._id)}>
                {u.name} — {u.email} ({u.role})
              </li>
            ),
          )}
        </ul>
      )}
    </main>
  );
}
