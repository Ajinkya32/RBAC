import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createMemberMutationFn, getUsersQueryFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

import { Loader } from "lucide-react";
import { useAuthContext } from "@/context/auth-provider";
import { CreateMemberType, UserType } from "@/types/api.type";

export default function AddMemberForm(props: { onClose?: () => void }) {
  const { onClose } = props;

  const { activeTeamId } = useAuthContext();

  const queryClient = useQueryClient();

  const formSchema = z.object({
    userId: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
    },
  });

  const { mutate, isPending } = useMutation({ mutationFn: createMemberMutationFn });

  const { data: users = [], isLoading: rolesLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersQueryFn,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;

    const payload: CreateMemberType = {
      userId: values.userId,
      teamId: activeTeamId ? activeTeamId : "",
    };

    mutate(payload, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["members", activeTeamId] });
        toast({ title: "Success", description: data.message, variant: "success" });
        if (onClose) setTimeout(() => onClose(), 100);
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error?.response?.data?.message || "An unexpected error occurred",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <div className="mb-5 pb-2 border-b">
          <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1 text-center sm:text-left">
            Add Member
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">Provide Member Details</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* User dropdown */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">User</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="!h-[48px]">
                          <SelectValue placeholder={rolesLoading ? "Loading..." : "Select Role"} />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user: UserType) => (
                            <SelectItem key={user._id} value={user._id}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={isPending}
              className="flex place-self-end h-[40px] text-white font-semibold"
              type="submit"
            >
              {isPending && <Loader className="animate-spin mr-2" />}
              Add
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
