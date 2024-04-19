import { RestaurantData } from "./_components/restaurant-data";

export default async function RestaurantePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(id);

  if (isNaN(idAsNumber)) throw new Error("Invalid restaurant id");

  return (
    <div>
      Restaurante
      <RestaurantData id={idAsNumber} />
    </div>
  );
}
