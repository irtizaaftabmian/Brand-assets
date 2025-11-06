import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AssetCard } from "./AssetCard";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";

interface ComponentAsset {
  id: string;
  name: string;
  code: string;
  description: string;
}

interface ComponentAssetsProps {
  searchQuery?: string;
}

export function ComponentAssets({ searchQuery = "" }: ComponentAssetsProps) {
  const [components, setComponents] = useState<ComponentAsset[]>([]);
  const [newComponent, setNewComponent] = useState({
    name: "",
    code: "",
    description: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("design-system-components");
    if (saved) {
      setComponents(JSON.parse(saved));
    }
  }, []);

  const saveComponents = (updatedComponents: ComponentAsset[]) => {
    setComponents(updatedComponents);
    localStorage.setItem("design-system-components", JSON.stringify(updatedComponents));
  };

  const handleAdd = () => {
    if (!newComponent.name || !newComponent.code) return;
    const component: ComponentAsset = {
      id: Date.now().toString(),
      ...newComponent,
    };
    saveComponents([...components, component]);
    setNewComponent({ name: "", code: "", description: "" });
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    saveComponents(components.filter(c => c.id !== id));
  };

  // Filter components based on search query
  const filteredComponents = components.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Components</h2>
          <p className="text-muted-foreground">Manage your component library</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Component
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Component</DialogTitle>
              <DialogDescription>
                Save a new component code snippet to your library
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Component Name</Label>
                <Input
                  placeholder="Button Primary"
                  value={newComponent.name}
                  onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  placeholder="Primary action button"
                  value={newComponent.description}
                  onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Code</Label>
                <Textarea
                  placeholder="<button className='...'>Click me</button>"
                  value={newComponent.code}
                  onChange={(e) => setNewComponent({ ...newComponent, code: e.target.value })}
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
              <Button onClick={handleAdd} className="w-full">Add Component</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {components.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No components yet. Add your first component to get started.</p>
        </div>
      ) : filteredComponents.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 text-center">
          <p className="text-muted-foreground">No components match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {filteredComponents.map((component) => (
            <AssetCard
              key={component.id}
              id={component.id}
              name={component.name}
              data={component}
              onDelete={handleDelete}
              preview={
                <div className="w-full h-full p-4 flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <div className="text-2xl mb-2">{"</>"}</div>
                    <p className="text-xs text-muted-foreground">{component.description}</p>
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
