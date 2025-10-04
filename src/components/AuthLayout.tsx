import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  children: ReactNode;
  footer?: ReactNode;
}

const AuthLayout = ({ title, description, heroTitle, heroDescription, children, footer }: AuthLayoutProps) => {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-10 text-primary-foreground lg:flex">
        <div className="flex items-center gap-3 text-primary-foreground/80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10">
            <span className="text-lg font-semibold">OR</span>
          </div>
          <span className="text-lg font-semibold tracking-wide">ORIT Ops</span>
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">{heroTitle}</h2>
          <p className="text-lg text-primary-foreground/80 lg:text-xl">{heroDescription}</p>
        </div>
        <p className="text-sm text-primary-foreground/70">
          Real-time datasets, satellite feeds, and community reports unified to drive cleaner city air.
        </p>
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute left-20 top-24 h-64 w-64 rounded-full bg-primary-foreground blur-3xl" />
          <div className="absolute bottom-16 right-12 h-72 w-72 rounded-full bg-primary-foreground/60 blur-3xl" />
        </div>
      </section>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="flex w-full max-w-md flex-col space-y-6">
          <Button variant="ghost" size="sm" asChild className="self-start -ml-2">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to main site
            </Link>
          </Button>
          <Card>
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl lg:text-3xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">{children}</CardContent>
            {footer ? <CardFooter className="flex-col items-start space-y-2">{footer}</CardFooter> : null}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
