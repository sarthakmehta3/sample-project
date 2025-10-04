import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { toast } = useToast();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    toast({
      title: "Login successful",
      description: `Welcome back, ${values.email}. Stay tuned for your latest air quality insights.`,
    });
  };

  return (
    <AuthLayout
      title="Sign in to ORIT Ops"
      description="Access live monitoring, alerts, and collaborative tools for cleaner urban air."
      heroTitle="Empower healthier cities with data-driven decisions"
      heroDescription="Log in to uncover localized pollution spikes, respond to alerts, and coordinate interventions that make neighborhoods safer."
      footer={
        <div className="text-sm text-muted-foreground">
          Need an account? {" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Create one now
          </Link>
        </div>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" placeholder="director@city.gov" {...field} />
                </FormControl>
                <FormDescription>We will send the latest air quality alerts to this inbox.</FormDescription>
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
                  <Input type="password" autoComplete="current-password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormDescription>Use at least eight characters including a number or symbol.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-start space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">Keep me signed in</FormLabel>
                    <FormDescription>Stay connected to receive real-time alerts on this device.</FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default Login;
