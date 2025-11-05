import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AssetCard } from "./AssetCard";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface ColorAsset {
  id: string;
  name: string;
  hex: string;
}

export function ColorAssets() {
  const [colors, setColors] = useState<ColorAsset[]>([]);
  const [newColor, setNewColor] = useState({ name: "", hex: "#000000" });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("design-system-colors");
    if (saved) {
      setColors(JSON.parse(saved));
    }
  }, []);

  const saveColors = (updatedColors: ColorAsset[]) => {
    setColors(updatedColors);
    localStorage.setItem("design-system-colors", JSON.stringify(updatedColors));
  };

  const handleAdd = () => {
    if (!newColor.name) return;
    const color: ColorAsset = {
      id: Date.now().toString(),
      name: newColor.name,
      hex: newColor.hex,
    };
    saveColors([...colors, color]);
    setNewColor({ name: "", hex: "#000000" });
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    saveColors(colors.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Colors</h2>
          <p className="text-muted-foreground">Manage your color palette</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Color
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Color</DialogTitle>
              <DialogDescription>
                Create a new color for your design system palette
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Color Name</Label>
                <Input
                  placeholder="Primary Blue"
                  value={newColor.name}
                  onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Hex Value</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={newColor.hex}
                    onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
                    className="w-20 h-10 cursor-pointer"
                  />
                  <Input
                    value={newColor.hex}
                    onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
                    placeholder="#000000"
                  />
                </div>
              </div>
              <Button onClick={handleAdd} className="w-full">Add Color</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {colors.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No colors yet. Add your first color to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {colors.map((color) => (
            <AssetCard
              key={color.id}
              id={color.id}
              name={color.name}
              data={color}
              onDelete={handleDelete}
              preview={
                <div className="w-full h-full" style={{ backgroundColor: color.hex }}>
                  <div className="p-4 flex flex-col justify-end h-full">
                    <div className="text-xs px-2 py-1 rounded bg-black/20 text-white backdrop-blur w-fit">
                      {color.hex}
                    </div>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
