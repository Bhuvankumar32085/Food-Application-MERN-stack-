import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LockKeyhole, Mail, User, Phone } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { signupSchema, type SignupType } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<SignupType>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const [error, seterrors] = useState<Partial<SignupType>>({});
  const { signup, loading } = useUserStore();

  const changeEvevtHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sumbitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // validation form
    const result = signupSchema.safeParse(input);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      seterrors(fieldError as Partial<SignupType>);
      return;
    }
    //signup api implementation start here
    try {
      await signup(input);
      navigate("/verify-email");  
    } catch (error) {
      console.log(error)
    }

    setInput({
      fullname: "",
      email: "",
      password: "",
      contact: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={sumbitHandler}
        className="md:p-8 w-full max-w-md rounded-lg  md:border border-gray-200 mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">Create Account</h1>
        </div>
        <div className="relative mb-5">
          <Input
            className="ps-10 focus-visible:ring-1"
            type="text"
            name="fullname"
            placeholder="Enter your full name"
            value={input.fullname}
            onChange={changeEvevtHandler}
          ></Input>
          <User className="text-gray-500 pointer-events-none absolute inset-y-1.5 inset-x-2" />
          {error.fullname && (
            <span className="text-sm text-red-500">{error.fullname}</span>
          )}
        </div>
        <div className="relative mb-5">
          <Input
            className="ps-10 focus-visible:ring-1"
            type="text"
            name="email"
            placeholder="Enter your email"
            value={input.email}
            onChange={changeEvevtHandler}
          ></Input>
          <Mail className="text-gray-500 pointer-events-none absolute inset-y-1.5 inset-x-2" />
          {error.email && (
            <span className="text-sm text-red-500">{error.email}</span>
          )}
        </div>
        <div className="relative">
          <Input
            className="ps-10 focus-visible:ring-1"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={input.password}
            onChange={changeEvevtHandler}
          ></Input>
          <LockKeyhole className="text-gray-500 pointer-events-none absolute inset-y-1.5 inset-x-2" />
          {error.password && (
            <span className="text-sm text-red-500">{error.password}</span>
          )}
        </div>
        <div className="relative mt-5">
          <Input
            className="ps-10 focus-visible:ring-1"
            type="text"
            name="contact"
            placeholder="Enter your contact"
            value={input.contact}
            onChange={changeEvevtHandler}
          ></Input>
          <Phone className="text-gray-500 pointer-events-none absolute inset-y-1.5 inset-x-2" />
          {error.contact && (
            <span className="text-sm text-red-500">{error.contact}</span>
          )}
        </div>
        <div className="mt-5">
          {loading ? (
            <Button disabled className="orange w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="orange w-full">
              Signup
            </Button>
          )}
        </div>
        <Separator className="my-4 h-px bg-gray-300" />
        <p className="mt-4">
          Already have an account ? {""}
          <Link to="/login" className="text-blue-500 ">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
