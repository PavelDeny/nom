// app/users/page.tsx
import { connectToMongo } from "@/lib/mongo/connect";
import { UserService } from "@/lib/mongo/services/UserService";
import { IUser } from "@/lib/mongo/models/User";

export const dynamic = "force-dynamic"; // всегда свежие данные

export default async function UsersPage() {
  await connectToMongo();
  const service = new UserService();

  let items: IUser[] = [];
  let loadError = false;

  try {
    const result = await service.findMany({
      pagination: { page: 1, pageSize: 20 },
    });
    items = result.items;
  } catch (error) {
    console.error("Failed to load users:", error);
    loadError = true;
  }

  return (
    <main>
      <h1>Users</h1>

      {loadError ? (
        <p>Ошибка загрузки данных. Повторите попытку позже.</p>
      ) : items.length === 0 ? (
        <p>Пока нет пользователей.</p>
      ) : (
        <ul>
          {items.map((u) => (
            <li key={String(u._id)}>
              {u.name} — {u.email} ({u.role})
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
