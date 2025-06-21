import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState, type Dispatch } from "react";
import { menuSchema } from "@/schema/menuSchema";
import type { MenuSchema } from "@/schema/menuSchema";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuSchema;
  editOpen: boolean;
  setEditOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState<Partial<MenuSchema>>({});
  const loading = false;
  const [input, setInput] = useState<MenuSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });

  const formSumbitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setError(fieldError as Partial<MenuSchema>);
      return;
    }
    console.log(input);
    // api implementations
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type == "number" ? Number(value) : value });
  };

  const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, image: e.target.files?.[0] || undefined });
  };

  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    });
  }, [selectedMenu]);

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit menu</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting!
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
              //   value={input.image}
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
  );
};
export default EditMenu;
