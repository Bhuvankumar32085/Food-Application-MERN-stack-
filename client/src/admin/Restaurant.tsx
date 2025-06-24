import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { RestaurantFormSchema } from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { restaurantFromSchema } from "@/schema/restaurantSchema";

const Restaurant = () => {
  const {
    loading,
    createRestaurant,
    restaurant,
    updateRestaurant,
    getRestaurant,
  } = useRestaurantStore();
  // const loading=false
  const [error, setError] = useState<Partial<RestaurantFormSchema>>({});

  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    image: undefined,
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const sumbitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = restaurantFromSchema.safeParse(input);
    if (!result.success) {
      //   console.log(result.error.format());
      setError(
        result.error.formErrors.fieldErrors as Partial<RestaurantFormSchema>
      );
      return;
    }

    // api implementations
    try {
      const formData = new FormData(); //form data for image upload because we passing image
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));
      if (input.image) {
        formData.append("image", input.image);
      }

      if (restaurant) {
        console.log("Updating restaurant...");
        await updateRestaurant(input);
      } else {
        await createRestaurant(formData);
      }
    } catch (error) {
      console.error("Error submitting restaurant form:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setInput({ ...input, image: file || undefined });
  };

   useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if(restaurant){
        setInput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          country: restaurant.country || "",
          deliveryTime: restaurant.deliveryTime || 0,
          cuisines: restaurant.cuisines
            ? restaurant.cuisines.map((cuisine: string) => cuisine)
            : [],
          image: undefined,
        });
      };
      }
    fetchRestaurant();
    // console.log('resturant ====>>',restaurant);
    
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
          <form onSubmit={sumbitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Restaurant Name  */}
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  type="text"
                  name="restaurantName"
                  value={input.restaurantName}
                  onChange={changeEventHandler}
                  placeholder="Enter your restaurant name"
                />
                {error && (
                  <span className="text-xs text-red-500 font-medium">
                    {error.restaurantName}
                  </span>
                )}
              </div>
              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  placeholder="Enter your city name"
                />
                {error && (
                  <span className="text-xs text-red-500 font-medium">
                    {error.city}
                  </span>
                )}
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  placeholder="Enter your country name"
                />
                {error && (
                  <span className="text-xs text-red-500 font-medium">
                    {error.country}
                  </span>
                )}
              </div>
              <div>
                <Label>Delivery Time</Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  placeholder="Enter your delivery time"
                />
                {error && (
                  <span className="text-xs text-red-500 font-medium">
                    {error.deliveryTime}
                  </span>
                )}
              </div>
              <div>
                <Label>Cuisines</Label>
                <Input
                  type="text"
                  name="cuisines"
                  value={input.cuisines}
                  onChange={(e) =>
                    setInput({ ...input, cuisines: e.target.value.split(",") })
                  }
                  placeholder="Enter your cuisines"
                />
                {error && (
                  <span className="text-xs text-red-500 font-medium">
                    {error.cuisines}
                  </span>
                )}
              </div>
              <div>
                <Label>Uploade Restaurant Image</Label>
                <Input
                  type="file"
                  name="image"
                  // value={input.image}
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {typeof error.image === "string" && (
                  <span className="text-xs text-red-500 font-medium">
                    {error.image}
                  </span>
                )}
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (
                <Button disabled className="orange">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="orange">
                  {restaurant ? "Edit Your Restaurant" : " Add Your Restauran"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
