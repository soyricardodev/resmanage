import Link from "next/link";
import { api } from "~/trpc/server";
import { Pin } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export async function AllRestaurants() {
  const data = await api.restaurant.getAll();

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {data.map((restaurant) => (
          <Card className="w-full lg:w-80">
            <CardHeader>
              <CardTitle>{restaurant.name}</CardTitle>
              <div className="grid place-items-start items-center w-full gap-1 [grid-template-columns:15px_auto]">
                <Pin className="size-3.5" />
                <CardDescription>{restaurant.location}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{restaurant.description ?? "No hay descripción"}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/dashboard/restaurantes/${restaurant.id}`}>
                  Ver
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
