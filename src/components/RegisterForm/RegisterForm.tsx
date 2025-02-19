"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import axios, { AxiosError } from "axios";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form/form";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  API_BASE_URL,
  API_ROUTES,
  APP_ROUTES,
} from "../../constants/routes.constants";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router";
import { useToast } from "../../hooks/useToast";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "User name must contain at least 3 characters" })
    .max(30, { message: "User name must contain no more than 30 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
  full_name: z.string().optional(),
});

export default function RegisterForm() {
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      full_name: "",
    },
  });

  async function register(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(`${API_BASE_URL}${API_ROUTES.signUp}`, {
        username: values.username,
        password: values.password,
        full_name: values.full_name,
      });

      if (response.status === 200) {
        localStorage.setItem("isAuth", "true");
        toast({ title: response.data.message });
        navigate(APP_ROUTES.home);
        setError("");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
        toast({ title: error.response?.data.message });
        throw new Error(error.response?.data.message);
      }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register your account</CardTitle>
          <CardDescription>
            Welcome! Please insert your credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <ErrorMessage error={error} />}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(register)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-blue-700 cursor-pointer"
                type="submit"
              >
                Register
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a
                  className="underline underline-offset-4"
                  href={APP_ROUTES.login}
                >
                  Log In
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
