import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router-dom";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { loginSchema, type LogingType } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";

const Login = () => {
  const { loading, login } = useUserStore();
  const [input, setInput] = useState<LogingType>({
    email: "",
    password: "",
  });

  const [error, setErrors] = useState<Partial<LogingType>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    //login validation
    const result = loginSchema.safeParse(input);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError as Partial<LogingType>);
      return;
    }

    //api
    await login(input);

    console.log("Form Data:", input);
    // API call starts here

    // Reset input and errors
    setInput({
      email: "",
      password: "",
    });
    setErrors({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={submitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">Login</h1>
        </div>

        {/* Email */}
        <div className="relative mb-5">
          <Input
            className={`ps-10 focus-visible:ring-1 ${
              error.email ? "border-red-500" : ""
            }`}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={input.email}
            onChange={changeEventHandler}
          />
          <Mail className="text-gray-500 pointer-events-none absolute inset-y-1.5 inset-x-2" />
          {error.email && (
            <span className="text-sm text-red-500">{error.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <Input
            className={`ps-10 focus-visible:ring-1 ${
              error.password ? "border-red-500" : ""
            }`}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={input.password}
            onChange={changeEventHandler}
          />
          <LockKeyhole className="text-gray-500 pointer-events-none absolute inset-y-1.5 inset-x-2" />
          {error.password && (
            <span className="text-sm text-red-500">{error.password}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-5">
          {loading ? (
            <Button disabled className="orange w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="orange w-full">
              Login
            </Button>
          )}
          <div className="mt-3 text-center">
            <Link
              to="/forgot-password"
              className="hover:text-blue-500 hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </div>

        {/* Footer */}
        <Separator className="my-4 h-px bg-gray-300" />
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
