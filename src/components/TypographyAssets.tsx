import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AssetCard } from "./AssetCard";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface TypographyAsset {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}

interface TypographyAssetsProps {
  searchQuery?: string;
}

export function TypographyAssets({ searchQuery = "" }: TypographyAssetsProps) {
  const [typography, setTypography] = useState<TypographyAsset[]>([]);
  const [newType, setNewType] = useState({
    name: "",
    fontFamily: "Helvetica Neue",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.5",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("design-system-typography");
    if (saved) {
      setTypography(JSON.parse(saved));
    }
  }, []);

  const saveTypography = (updatedTypography: TypographyAsset[]) => {
    setTypography(updatedTypography);
    localStorage.setItem("design-system-typography", JSON.stringify(updatedTypography));
  };

  const handleAdd = () => {
    if (!newType.name) return;
    const type: TypographyAsset = {
      id: Date.now().toString(),
      ...newType,
    };
    saveTypography([...typography, type]);
    setNewType({
      name: "",
      fontFamily: "Helvetica Neue",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "1.5",
    });
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    saveTypography(typography.filter(t => t.id !== id));
  };

  // Filter typography based on search query
  const filteredTypography = typography.filter((type) =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.fontFamily.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Typography</h2>
          <p className="text-muted-foreground">Manage your typography styles</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Typography
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Typography Style</DialogTitle>
              <DialogDescription>
                Define a new typography style for your design system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Style Name</Label>
                <Input
                  placeholder="Heading 1"
                  value={newType.name}
                  onChange={(e) => setNewType({ ...newType, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Font Family</Label>
                <Input
                  placeholder="Helvetica Neue"
                  value={newType.fontFamily}
                  onChange={(e) => setNewType({ ...newType, fontFamily: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Input
                    placeholder="16px"
                    value={newType.fontSize}
                    onChange={(e) => setNewType({ ...newType, fontSize: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Font Weight</Label>
                  <Select
                    value={newType.fontWeight}
                    onValueChange={(value) => setNewType({ ...newType, fontWeight: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300">Light (300)</SelectItem>
                      <SelectItem value="400">Regular (400)</SelectItem>
                      <SelectItem value="500">Medium (500)</SelectItem>
                      <SelectItem value="600">Semibold (600)</SelectItem>
                      <SelectItem value="700">Bold (700)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Line Height</Label>
                <Input
                  placeholder="1.5"
                  value={newType.lineHeight}
                  onChange={(e) => setNewType({ ...newType, lineHeight: e.target.value })}
                />
              </div>
              <Button onClick={handleAdd} className="w-full">Add Typography</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {typography.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No typography styles yet. Add your first style to get started.</p>
        </div>
      ) : filteredTypography.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No typography styles match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filteredTypography.map((type) => (
            <AssetCard
              key={type.id}
              id={type.id}
              name={type.name}
              data={type}
              onDelete={handleDelete}
              preview={
                <div className="w-full h-full p-4 flex items-center justify-center">
                  <p
                    style={{
                      fontFamily: type.fontFamily,
                      fontSize: type.fontSize,
                      fontWeight: type.fontWeight,
                      lineHeight: type.lineHeight,
                    }}
                  >
                    Aa
                  </p>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
