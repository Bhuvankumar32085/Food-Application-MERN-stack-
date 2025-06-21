import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import EditMenu from "./EditMenu";
import { menuSchema } from "@/schema/menuSchema";
import type { MenuSchema } from "@/schema/menuSchema";

const menu = [
  {
    name: "Biryani",
    description:
      "lokdjkh kj jfhfk gfsaghdfjhegfgkjl kr reg fesf lhs fghe fheg fefg ",
    price: 80,
    image:
      "https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg",
  },
  {
    name: "Momose",
    description: "Mast beg momo in your city and i give you my best",
    price: 20,
    image:
      "https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg",
  },
];

const AddMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const loading = false;
  const [selectedMenu, SetSelectedMenu] = useState<any>();
  const [error, setError] = useState<Partial<MenuSchema>>({});
  const [input, setInput] = useState<MenuSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type == "number" ? Number(value) : value });
  };

  const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, image: e.target.files?.[0] || undefined });
  };

  const formSumbitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setError(fieldError as Partial<MenuSchema>);
      return;
    }
    console.log(input);
    //api implementations
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="orange">
              <Plus className="mr-2" />
              Add Menus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant stand out,
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={formSumbitHandler} className="flex flex-col gap-3">
              <div>
                <Label className="mb-2">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeHandler}
                  placeholder="Enter menu name"
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.name}
                  </span>
                )}
              </div>
              <div>
                <Label className="mb-2">Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeHandler}
                  placeholder="Add menu description"
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.description}
                  </span>
                )}
              </div>
              <div>
                <Label className="mb-2">Price in (Rupees)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={changeHandler}
                  placeholder="Enter menu price"
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.price}
                  </span>
                )}
              </div>
              <div>
                <Label className="mb-2">Upload menu Image</Label>
                <Input
                  type="file"
                  name="image"
                  // value={input.image}
                  onChange={changeFileHandler}
                  accept="image/*"
                />
                {error && (
                  <span className="text-xs font-medium text-red-600">
                    {error.image?.name}
                  </span>
                )}
              </div>
              <DialogFooter>
                {loading ? (
                  <Button disabled className="orange w-full">
                    <Loader2 className="animate-spin mr-2" />
                    Please wait
                  </Button>
                ) : (
                  <Button className="orange w-full">Submit</Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {menu.map((item: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-4">
          <div className="flex p-2 flex-col md:flex-row md:items-center md:space-x-4 shadow-md rounded-lg border">
            <img
              src={item.image}
              alt="Google-Food-img"
              className="md:h-24 md:w-24 h-26 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-[#D19254]">{item.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                SetSelectedMenu(item);
                setEditOpen(true);
              }}
              size={"sm"}
              className="orange"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}

      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
