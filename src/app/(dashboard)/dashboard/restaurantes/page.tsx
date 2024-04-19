import { AllRestaurants } from "./_components/all-restaurants";
import { CreateRestaurant } from "./_components/create-restaurant";

export default function RestaurantesPage() {
  return (
    <div className="flex items-start flex-col gap-4">
      <h1 className="text-lg font-semibold md:text-2xl">Mis restaurantes</h1>

      <div className="flex flex-col gap-4 my-4">
        <CreateRestaurant />
        <AllRestaurants />
      </div>
    </div>
  );
}
