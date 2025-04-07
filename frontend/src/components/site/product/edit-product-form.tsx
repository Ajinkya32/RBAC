import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
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
import { Textarea } from "../../ui/textarea";
import { updateProductMutationFn } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { ProductType } from "@/types/api.type";

const baseURL = import.meta.env.VITE_IMAGE_BASE_URL;

export default function EditProductForm(props: { onClose: () => void; data: ProductType }) {
  const { onClose, data } = props;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProductMutationFn,
  });

  const formSchema = z.object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    description: z.string().trim().min(1, { message: "Description is required" }),
    price: z.preprocess(
      (val) => Number(val),
      z.number().min(1, { message: "Price must be greater than 0" })
    ),
    image: z
      .union([
        z.instanceof(FileList),
        z.string(),
        z.undefined(), // ✅ allow empty field
      ])
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
    },
  });

  const onSubmit = () => {
    if (isPending) return;

    const watched = form.watch();

    const formData = new FormData();
    formData.append("name", watched.name);
    formData.append("description", watched.description);
    formData.append("price", watched.price.toString());

    if (watched.image instanceof FileList) {
      formData.append("image", watched.image[0]); // Use the first file in FileList
    } else if (typeof watched.image === "string" && watched.image) {
      formData.append("image", watched.image); // Pass the existing image URL
    }

    const payload = {
      id: data._id,
      data: formData,
    };

    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["all-products"] });
        toast({
          title: "Success",
          description: "Product updated successfully",
          variant: "success",
        });
        onClose();
      },
      onError: (error) => {
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
          <h1
            className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1
           text-center sm:text-left"
          >
            Edit Product
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">Edit product details.</p>
        </div>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Product name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="T-Shirt"
                        className="!h-[48px]"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* {Description} */}
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Product description
                    </FormLabel>
                    <FormControl>
                      <Textarea rows={1} placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="500" className="!h-[48px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">Image</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          type="file"
                          accept="image/*"
                          className="!h-[48px]"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                        {/* Show existing image preview if no new file is selected */}
                        {typeof field.value === "string" && (
                          <img
                            src={`${baseURL}/${field.value}`}
                            alt="Current product"
                            className="mt-2 w-32 h-32 object-cover rounded border"
                          />
                        )}

                        {field.value instanceof FileList && field.value.length > 0 && (
                          <img
                            src={URL.createObjectURL(field.value[0])}
                            alt="Uploaded preview"
                            className="mt-2 w-32 h-32 object-cover rounded border"
                          />
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className="flex place-self-end  h-[40px] text-white font-semibold"
              type="submit"
              disabled={isPending}
            >
              {isPending && <Loader className="animate-spin" />}
              Update
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
