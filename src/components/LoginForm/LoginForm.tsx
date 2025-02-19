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
});

export default function LoginForm() {
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function login(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(`${API_BASE_URL}${API_ROUTES.signIn}`, {
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        localStorage.setItem("isAuth", "true");
        toast({ title: response.data.message });
        navigate(APP_ROUTES.home);
        setError("");
        // console.log("login-cookie:", document.cookie); // returns empty even though the token is set in cookies (remove after fixing)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
        toast({ title: `Ошибка! ${error.response?.data.message}` });
        throw new Error(error.response?.data.message);
      }
    }
  }

  // console.log("login-cookie:", document.cookie); // returns empty even though the token is set in cookies (remove after fixing)

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Welcome back! Please insert your email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <ErrorMessage error={error} />}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className="space-y-8">
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
              <Button
                className="w-full bg-blue-700 cursor-pointer"
                type="submit"
              >
                Login
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t register yet?{" "}
                <a
                  className="underline underline-offset-4"
                  href={APP_ROUTES.register}
                >
                  Register
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
