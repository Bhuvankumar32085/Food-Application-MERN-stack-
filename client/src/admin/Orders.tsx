import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";

const Orders = () => {
  const { getReataurantOrdes, updateRestaurantOrder, restaurantOrders } =
    useRestaurantStore();

  const handelStatuschange = async (id: string, status: string) => {
    await updateRestaurantOrder(id, status);
  };

  useEffect(() => {
    getReataurantOrdes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
        Orders Overview
      </h1>

      <div className="space-y-8">
        {restaurantOrders.map((order, idx) => {
          const totalAmount = order.cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );

          return (
            <Card
              key={order._id || idx}
              className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex-1 mb-6 sm:mb-0">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {order.deliveryDetails.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-semibold">Address: </span>
                  {order.deliveryDetails.address}, {order.deliveryDetails.city}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-semibold">Email: </span>
                  {order.deliveryDetails.email}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-semibold">Total Amount: ₹</span>
                  {totalAmount}
                </p>

                {/* <div className="mt-4">
                  <h2 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Items:
                  </h2>
                  {order.cartItems.map((item, itemIndex) => (
                    <div
                      key={item._id || itemIndex}
                      className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 py-1"
                    >
                      <span className="text-gray-700 dark:text-gray-200">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-gray-700 dark:text-gray-200">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div> */}
              </div>

              <div className="w-full sm:w-1/3">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order Status
                </Label>
                <Select
                  onValueChange={(newStatus) =>
                    handelStatuschange(order._id, newStatus)
                  }
                  defaultValue={order.status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[
                        "Pending",
                        "Confirmed",
                        "Preparing",
                        "OutForDelivery",
                        "Delivered",
                      ].map((status, index) => (
                        <SelectItem key={index} value={status.toLowerCase()}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
