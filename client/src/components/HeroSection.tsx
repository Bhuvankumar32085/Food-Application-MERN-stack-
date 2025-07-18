import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroImage from "@/assets/hero_pizza.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate=useNavigate()
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
      <div>
        <img src={HeroImage} className="object-cover w-full max-h-[500px]" />
      </div>
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl ">
            Order food anytime & anywheare
          </h1>
          <p className="text-gray-500">
            Hey|Our Delicios Food is Waiting for you, we are always near to you
          </p>
        </div>
        <div className="relative flex items-center gap-2">
          <Input
            type="text"
            value={searchText}
            placeholder="Search restaurant by name, city & country"
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-12 shadow-lg"
          />
          <Search className="absolute inset-y-2 inset-x-2 text-gray-500" />
          <Button onClick={()=>navigate(`/search/${searchText}`)} className="orange">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
