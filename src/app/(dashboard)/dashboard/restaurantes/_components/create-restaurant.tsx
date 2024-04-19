"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { restaurantInput } from "~/utils/validators";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

export function CreateRestaurant() {
  const router = useRouter();
  const form = useForm<z.infer<typeof restaurantInput>>({
    resolver: zodResolver(restaurantInput),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      isPublished: false,
    },
  });

  const { mutate, isSuccess, isPending, isError } =
    api.restaurant.createRestaurant.useMutation({
      onSuccess: () => {
        form.reset();
        router.refresh();
      },
      onError: ({ shape, message, data }) => {
        console.log("error");
        console.log({ shape, message, data });
      },
    });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof restaurantInput>) {
    console.log({
      email: values.email,
      name: values.name,
      phone: values.phone,
      location: values.location,
      isPublished: values.isPublished,
    });
    mutate({
      email: values.email,
      name: values.name,
      phone: values.phone,
      location: values.location,
      isPublished: values.isPublished,
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear un restaurante</CardTitle>
        <CardDescription className="text-base">
          Llena los campos basicos para crearlo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Crear</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear Restaurante</DialogTitle>
              <DialogDescription>
                Crea los detalles basicos de tu restaurante. Haz click en Crear
                cuando este listo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Rica Pizza" {...field} />
                        </FormControl>
                        <FormDescription>
                          Este sera el nombre que aparecerá en tu restaurante.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ubicación</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tocuyito, Bajos de Guataparo"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Esta será el nombre que aparecerá en tu restaurante.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefono</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="+58 999 999 999"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Este sera el número de teléfono que aparecerá en tu
                          restaurante.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="hola@ricapizza.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Este sera el email que aparecerá en tu restaurante.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Marcar como publicado</FormLabel>
                        <FormControl>
                          {/* 
                            // @ts-expect-error missing type
                          */}
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Decide si quieres que salga en las busquedas.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit">Crear</Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
