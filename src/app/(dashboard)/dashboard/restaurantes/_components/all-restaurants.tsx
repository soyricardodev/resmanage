import { api } from "~/trpc/server";

import { Card, CardHeader, CardTitle } from "~/components/ui/card";

export async function AllRestaurants() {
  const data = await api.restaurant.getAll();

  return (
    <div className="bg-red-500 w-full flex flex-col gap-4">
      <h3>All Restaurants</h3>

      <div className="flex flex-wrap">
        {data.map((restaurant) => (
          <Card>
            <CardHeader>
              <CardTitle>{restaurant.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
