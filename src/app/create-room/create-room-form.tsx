"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { createRoomAction } from "./actions";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3).max(50),  
  description: z.string().min(1).max(250),
  githubRepo: z.string().min(1).max(100),
  language: z.string().min(1).max(50),
});

export function CreateRoomForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepo: "",
      language: "",
    },
  });

 async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    const roomId = await createRoomAction(values);
    toast("Room Created", {
      description: "Your room was successfully created",
    });
    setTimeout(() => {
      router.push(`/rooms/${roomId}`);
    }, 1200);
  } catch (error) {
    toast("Error", {
      description: "Failed to create room",
      variant: "destructive",
    });
  }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Room name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public room name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

              <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Input placeholder="Room name" {...field} />
              </FormControl>
              <FormDescription>
                Please discribe what will you be coding  on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo</FormLabel>
              <FormControl>
                <Input placeholder="Room name" {...field} />
              </FormControl>
              <FormDescription>
                Please put a link to the project you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags  </FormLabel>
              <FormControl>
                <Input placeholder="e.g. TypeScript" {...field} />
              </FormControl>
              <FormDescription>
               List the  programming language, framework you are working on so that others can find you
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>

      </form>
    </Form>

   );

}



