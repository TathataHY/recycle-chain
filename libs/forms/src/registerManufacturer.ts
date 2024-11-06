import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const schemaRegisterManufacturer = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  contact: z.string().min(1, { message: "Contact is required" }),
});

export type FormTypeRegisterManufacturer = z.infer<
  typeof schemaRegisterManufacturer
>;

export const useFormRegisterManufacturer = () =>
  useForm<FormTypeRegisterManufacturer>({
    resolver: zodResolver(schemaRegisterManufacturer),
  });
