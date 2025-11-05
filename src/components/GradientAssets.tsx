import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AssetCard } from "./AssetCard";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface GradientAsset {
  id: string;
  name: string;
  color1: string;
  color2: string;
  angle: number;
}

export function GradientAssets() {
  const [gradients, setGradients] = useState<GradientAsset[]>([]);
  const [newGradient, setNewGradient] = useState({
    name: "",
    color1: "#6366f1",
    color2: "#ec4899",
    angle: 135,
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("design-system-gradients");
    if (saved) {
      setGradients(JSON.parse(saved));
    }
  }, []);

  const saveGradients = (updatedGradients: GradientAsset[]) => {
    setGradients(updatedGradients);
    localStorage.setItem("design-system-gradients", JSON.stringify(updatedGradients));
  };

  const handleAdd = () => {
    if (!newGradient.name) return;
    const gradient: GradientAsset = {
      id: Date.now().toString(),
      ...newGradient,
    };
    saveGradients([...gradients, gradient]);
    setNewGradient({ name: "", color1: "#6366f1", color2: "#ec4899", angle: 135 });
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    saveGradients(gradients.filter(g => g.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Gradients</h2>
          <p className="text-muted-foreground">Manage your gradient library</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Gradient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Gradient</DialogTitle>
              <DialogDescription>
                Create a new gradient for your design system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Gradient Name</Label>
                <Input
                  placeholder="Sunset Gradient"
                  value={newGradient.name}
                  onChange={(e) => setNewGradient({ ...newGradient, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Color 1</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={newGradient.color1}
                      onChange={(e) => setNewGradient({ ...newGradient, color1: e.target.value })}
                      className="w-12 h-10 cursor-pointer"
                    />
                    <Input
                      value={newGradient.color1}
                      onChange={(e) => setNewGradient({ ...newGradient, color1: e.target.value })}
                      placeholder="#6366f1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Color 2</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={newGradient.color2}
                      onChange={(e) => setNewGradient({ ...newGradient, color2: e.target.value })}
                      className="w-12 h-10 cursor-pointer"
                    />
                    <Input
                      value={newGradient.color2}
                      onChange={(e) => setNewGradient({ ...newGradient, color2: e.target.value })}
                      placeholder="#ec4899"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Angle: {newGradient.angle}°</Label>
                <Input
                  type="range"
                  min="0"
                  max="360"
                  value={newGradient.angle}
                  onChange={(e) => setNewGradient({ ...newGradient, angle: parseInt(e.target.value) })}
                />
              </div>
              <Button onClick={handleAdd} className="w-full">Add Gradient</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {gradients.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No gradients yet. Add your first gradient to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {gradients.map((gradient) => (
            <AssetCard
              key={gradient.id}
              id={gradient.id}
              name={gradient.name}
              data={gradient}
              onDelete={handleDelete}
              preview={
                <div
                  className="w-full h-full"
                  style={{
                    background: `linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2})`,
                  }}
                />
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
