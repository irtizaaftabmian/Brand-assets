import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AssetCard } from "./AssetCard";
import { Plus, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";

interface IconAsset {
  id: string;
  name: string;
  svg: string;
}

export function IconAssets() {
  const [icons, setIcons] = useState<IconAsset[]>([]);
  const [newIcon, setNewIcon] = useState({ name: "", svg: "" });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("design-system-icons");
    if (saved) {
      setIcons(JSON.parse(saved));
    }
  }, []);

  const saveIcons = (updatedIcons: IconAsset[]) => {
    setIcons(updatedIcons);
    localStorage.setItem("design-system-icons", JSON.stringify(updatedIcons));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setNewIcon({
        ...newIcon,
        svg: result,
        name: newIcon.name || file.name.replace('.svg', ''),
      });
    };
    reader.readAsText(file);
  };

  const handleAdd = () => {
    if (!newIcon.name || !newIcon.svg) return;
    const icon: IconAsset = {
      id: Date.now().toString(),
      name: newIcon.name,
      svg: newIcon.svg,
    };
    saveIcons([...icons, icon]);
    setNewIcon({ name: "", svg: "" });
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    saveIcons(icons.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Icons</h2>
          <p className="text-muted-foreground">Manage your icon library</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Icon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Icon</DialogTitle>
              <DialogDescription>
                Add a new SVG icon to your design system library
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Icon Name</Label>
                <Input
                  placeholder="Menu Icon"
                  value={newIcon.name}
                  onChange={(e) => setNewIcon({ ...newIcon, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>SVG Code or Upload</Label>
                <div className="border border-dashed rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept=".svg"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="icon-upload"
                  />
                  <label htmlFor="icon-upload" className="cursor-pointer">
                    <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Upload SVG file</p>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Or paste SVG code</Label>
                <Textarea
                  placeholder="<svg>...</svg>"
                  value={newIcon.svg}
                  onChange={(e) => setNewIcon({ ...newIcon, svg: e.target.value })}
                  rows={6}
                />
              </div>
              {newIcon.svg && (
                <div className="border rounded-lg p-4 bg-muted flex items-center justify-center">
                  <div dangerouslySetInnerHTML={{ __html: newIcon.svg }} className="w-12 h-12" />
                </div>
              )}
              <Button onClick={handleAdd} className="w-full" disabled={!newIcon.name || !newIcon.svg}>
                Add Icon
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {icons.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No icons yet. Add your first icon to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {icons.map((icon) => (
            <AssetCard
              key={icon.id}
              id={icon.id}
              name={icon.name}
              data={icon}
              onDelete={handleDelete}
              preview={
                <div className="w-full h-full flex items-center justify-center">
                  <div dangerouslySetInnerHTML={{ __html: icon.svg }} className="w-16 h-16" />
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
