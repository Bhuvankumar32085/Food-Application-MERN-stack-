import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail,Loader2 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const ForgotPassword = () => {
    const [email,setemail]=useState<string>('')
    const loading=false
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
        <form className="flex flex-col gap-5  md:p-8 w-full max-w-md rounded-lg mx-4">
          <div className="text-center">
                <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
                <p className="text-sm text-gray-600">Enter your email address to reset your password</p>

          </div>
          <div className="relative w-full">
            <Input
              type='text'
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              placeholder="Enter your email"
              className="pl-9"
            />
            <Mail className="absolute inset-y-1.5 inset-x-2 text-gray-500"/>
          </div>
          {loading ? (
            <Button disabled className="orange w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="orange w-full">
              Send reset link
            </Button>
          )}
          <span>
            Back to {" "}
            <Link to='/login' className="text-blue-500">Login</Link>
          </span>
        </form>
    </div>
  )
}

export default ForgotPassword