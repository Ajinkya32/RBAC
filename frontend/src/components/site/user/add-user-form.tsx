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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUserMutationFn, fetchRoles, fetchTeams } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

import { Loader } from "lucide-react";
import { RoleType, TeamType } from "@/types/api.type";

export default function AddUserForm(props: { onClose?: () => void }) {
  const { onClose } = props;

  const queryClient = useQueryClient();

  const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    email: z.string().trim(),
    password: z.string().trim(),
    roleId: z.string().trim(),
    teamId: z.string().trim().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roleId: "",
      teamId: undefined,
    },
  });

  const { mutate, isPending } = useMutation({ mutationFn: createUserMutationFn });

  const { data: roles = [], isLoading: rolesLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });

  const { data: teams = [], isLoading: teamsLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;
    mutate(values, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({
          queryKey: ["members"],
        });
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
            Add User
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">Provide User Details</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon" className="!h-[48px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" className="!h-[48px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" className="!h-[48px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Role dropdown */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="!h-[48px]">
                          <SelectValue placeholder={rolesLoading ? "Loading..." : "Select Role"} />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role: RoleType) => (
                            <SelectItem key={role._id} value={role._id}>
                              {role.name}
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

            {/* Team dropdown */}
            <div className="mb-4">
              <FormField
                control={form.control}
                name="teamId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Team (optional)</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="!h-[48px]">
                          <SelectValue placeholder={teamsLoading ? "Loading..." : "Select Team"} />
                        </SelectTrigger>
                        <SelectContent>
                          {teams.map((team: TeamType) => (
                            <SelectItem key={team._id} value={team._id}>
                              {team.name}
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
