import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Must use forwardRef!
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const VerifyEmail = () => {
  const navigate = useNavigate();
  const {verifyEmail,loading} = useUserStore();
  const [otp, setOTP] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]); // Properly typed

  const handleChange = (idx: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      setOTP((pv) => {
        const updated = [...pv]; // ✅ Copy banayi
        updated[idx] = value; // ✅ Usme value set ki
        return updated; // ✅ Safe and correct update
      });

      if (value !== "" && idx < 5) {
        inputRef.current[idx + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && otp[idx] === "" && idx > 0) {
      inputRef.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length === 6) {
      console.log("OTP Verified:", enteredOtp);
      // ✅ API call yahan karo
      try {
        await verifyEmail(otp);
        navigate("/login");
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("Please enter all 6 characters of the OTP");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="mt-5 text-sm text-gray-600">
            Enter 6 digit code sent to your email address
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mt-5 gap-2">
            {otp.map((letter: string, index: number) => (
              <Input
                key={index}
                type="text"
                value={letter}
                ref={(el) => {
                  inputRef.current[index] = el;
                }}
                maxLength={1}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          {loading ? (
            <Button disabled className="orange w-full mt-5">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="orange w-full mt-5">
              Verify
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
