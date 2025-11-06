import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AssetCard } from "./AssetCard";
import { Plus, CheckSquare, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface ColorAsset {
  id: string;
  name: string;
  hex: string;
}

interface ColorAssetsProps {
  searchQuery?: string;
}

export function ColorAssets({ searchQuery = "" }: ColorAssetsProps) {
  const [colors, setColors] = useState<ColorAsset[]>([]);
  const [newColor, setNewColor] = useState({ name: "", hex: "#000000" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

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

  // Filter colors based on search query
  const filteredColors = colors.filter((color) =>
    color.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    color.hex.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Bulk operations handlers
  const handleSelectToggle = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredColors.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredColors.map(c => c.id)));
    }
  };

  const handleDeleteSelected = () => {
    const remaining = colors.filter(c => !selectedIds.has(c.id));
    saveColors(remaining);
    setSelectedIds(new Set());
    setBulkMode(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Colors</h2>
          <p className="text-muted-foreground">Manage your color palette</p>
        </div>
        <div className="flex items-center gap-2">
          {bulkMode && (
            <>
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                <CheckSquare className="w-4 h-4 mr-2" />
                {selectedIds.size === filteredColors.length ? 'Deselect All' : 'Select All'}
              </Button>
              {selectedIds.size > 0 && (
                <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete {selectedIds.size}
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => {
                setBulkMode(false);
                setSelectedIds(new Set());
              }}>
                Cancel
              </Button>
            </>
          )}
          {!bulkMode && colors.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => setBulkMode(true)}>
              <CheckSquare className="w-4 h-4 mr-2" />
              Select
            </Button>
          )}
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
      ) : filteredColors.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No colors match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filteredColors.map((color) => (
            <AssetCard
              key={color.id}
              id={color.id}
              name={color.name}
              data={color}
              onDelete={handleDelete}
              bulkMode={bulkMode}
              isSelected={selectedIds.has(color.id)}
              onSelect={handleSelectToggle}
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
