import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Moon, Sun, Link2 } from "lucide-react";
import { TypographyAssets } from "./components/TypographyAssets";
import { ColorAssets } from "./components/ColorAssets";
import { GradientAssets } from "./components/GradientAssets";
import { LogoAssets } from "./components/LogoAssets";
import { IconAssets } from "./components/IconAssets";
import { ComponentAssets } from "./components/ComponentAssets";
import { BackgroundAnimation } from "./components/BackgroundAnimation";
import { ShareDialog } from "./components/ShareDialog";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("design-system-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("design-system-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const getAllData = () => {
    return {
      typography: JSON.parse(localStorage.getItem("design-system-typography") || "[]"),
      colors: JSON.parse(localStorage.getItem("design-system-colors") || "[]"),
      gradients: JSON.parse(localStorage.getItem("design-system-gradients") || "[]"),
      logos: JSON.parse(localStorage.getItem("design-system-logos") || "[]"),
      icons: JSON.parse(localStorage.getItem("design-system-icons") || "[]"),
      components: JSON.parse(localStorage.getItem("design-system-components") || "[]"),
    };
  };

  const handleExportAll = () => {
    setShareDialogOpen(true);
  };

  const shareUrl = `${window.location.origin}?data=${encodeURIComponent(JSON.stringify(getAllData()))}`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get("data");
    
    if (sharedData) {
      try {
        const data = JSON.parse(decodeURIComponent(sharedData));
        if (data.typography) localStorage.setItem("design-system-typography", JSON.stringify(data.typography));
        if (data.colors) localStorage.setItem("design-system-colors", JSON.stringify(data.colors));
        if (data.gradients) localStorage.setItem("design-system-gradients", JSON.stringify(data.gradients));
        if (data.logos) localStorage.setItem("design-system-logos", JSON.stringify(data.logos));
        if (data.icons) localStorage.setItem("design-system-icons", JSON.stringify(data.icons));
        if (data.components) localStorage.setItem("design-system-components", JSON.stringify(data.components));
        toast.success("Design system imported successfully");
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.error("Failed to import shared data:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <BackgroundAnimation />
      <Toaster />
      
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <div>
            <h1>Design System</h1>
            <p className="text-muted-foreground">Manage and share your design assets</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleExportAll}>
              <Link2 className="w-4 h-4 mr-2" />
              Share All
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-8">
        <Tabs defaultValue="typography" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="gradients">Gradients</TabsTrigger>
            <TabsTrigger value="logos">Logos</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
          </TabsList>

          <TabsContent value="typography">
            <TypographyAssets />
          </TabsContent>

          <TabsContent value="colors">
            <ColorAssets />
          </TabsContent>

          <TabsContent value="gradients">
            <GradientAssets />
          </TabsContent>

          <TabsContent value="logos">
            <LogoAssets />
          </TabsContent>

          <TabsContent value="icons">
            <IconAssets />
          </TabsContent>

          <TabsContent value="components">
            <ComponentAssets />
          </TabsContent>
        </Tabs>
      </main>
      
      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        shareUrl={shareUrl}
        title="Share Design System"
        description="Copy this link to share your entire design system with others"
      />
    </div>
  );
}
