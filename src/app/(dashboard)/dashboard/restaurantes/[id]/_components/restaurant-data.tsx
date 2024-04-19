import { api } from "~/trpc/server";

import { Card, CardContent } from "~/components/ui/card";

export async function RestaurantData({ id }: { id: number }) {
  const data = await api.restaurant.getRestaurant({
    restaurantId: id,
  });

  return (
    <Card>
      <CardContent>{JSON.stringify(data)}</CardContent>
    </Card>
  );
}
