"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import cityData from "./rankcity.json";

const FormSchema = z.object({
  items: z
    .array(z.string())
    .refine((value) => value.length >= 5 && value.length <= 5, {
      message: "選択箇所が5箇所ではありません",
    }),
});

export default function Home() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.items);
    const param = data.items;
    const url =
      "/result?first=0" +
      "&second=" +
      param[0] +
      "&third=" +
      param[1] +
      "&fourth=" +
      param[2] +
      "&fifth=" +
      param[3] +
      "&sixth=" +
      param[4];
    router.push(url);
  }
  const cityList = JSON.parse(JSON.stringify(cityData));

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 sm:gap-8">
        <main
          className="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 flex flex-col gap-12 my-20"
          id="main"
        >
          <h1 className="mx-auto font-bold text-2xl">
            行きたい場所を5箇所選択してください
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-12"
            >
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem className="flex flex-col gap-6">
                    <ScrollArea className="h-[500px] w-full rounded-md border p-4 mx-auto">
                      {cityList.map((item: { id: string; label: string }) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="items"
                          render={({ field }) => (
                            <FormItem
                              className="flex items-center gap-2"
                              key={item.id}
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-2xl">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </ScrollArea>
                    <FormMessage className="mx-auto" />
                  </FormItem>
                )}
              />

              <Button className="mx-auto" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </main>
      </div>
    </div>
  );
}
