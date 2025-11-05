import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AssetCard } from "./AssetCard";
import { Plus, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface LogoAsset {
  id: string;
  name: string;
  imageUrl: string;
  format: string;
}

export function LogoAssets() {
  const [logos, setLogos] = useState<LogoAsset[]>([]);
  const [newLogo, setNewLogo] = useState({ name: "", imageUrl: "" });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("design-system-logos");
    if (saved) {
      setLogos(JSON.parse(saved));
    }
  }, []);

  const saveLogos = (updatedLogos: LogoAsset[]) => {
    setLogos(updatedLogos);
    localStorage.setItem("design-system-logos", JSON.stringify(updatedLogos));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewLogo({
        ...newLogo,
        imageUrl: reader.result as string,
        name: newLogo.name || file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!newLogo.name || !newLogo.imageUrl) return;
    const logo: LogoAsset = {
      id: Date.now().toString(),
      name: newLogo.name,
      imageUrl: newLogo.imageUrl,
      format: newLogo.imageUrl.startsWith('data:image/svg') ? 'SVG' : 'PNG',
    };
    saveLogos([...logos, logo]);
    setNewLogo({ name: "", imageUrl: "" });
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    saveLogos(logos.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Logos</h2>
          <p className="text-muted-foreground">Manage your logo assets</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Logo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Logo</DialogTitle>
              <DialogDescription>
                Upload a new logo asset to your design system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Logo Name</Label>
                <Input
                  placeholder="Company Logo"
                  value={newLogo.name}
                  onChange={(e) => setNewLogo({ ...newLogo, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Upload Logo</Label>
                <div className="border border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-foreground/20 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Click to upload logo</p>
                    {newLogo.imageUrl && (
                      <div className="mt-4">
                        <img
                          src={newLogo.imageUrl}
                          alt="Preview"
                          className="max-h-32 mx-auto"
                        />
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <Button onClick={handleAdd} className="w-full" disabled={!newLogo.name || !newLogo.imageUrl}>
                Add Logo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {logos.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No logos yet. Add your first logo to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {logos.map((logo) => (
            <AssetCard
              key={logo.id}
              id={logo.id}
              name={logo.name}
              data={logo}
              onDelete={handleDelete}
              preview={
                <div className="w-full h-full p-4 flex items-center justify-center">
                  <img
                    src={logo.imageUrl}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
