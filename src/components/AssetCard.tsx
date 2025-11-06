import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Copy, Download, Trash2, Share2 } from "lucide-react";
import { toast } from "sonner";
import { ShareDialog } from "./ShareDialog";

interface AssetCardProps {
  id: string;
  name: string;
  preview: React.ReactNode;
  data: any;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  bulkMode?: boolean;
}

export function AssetCard({ id, name, preview, data, onDelete, isSelected = false, onSelect, bulkMode = false }: AssetCardProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const shareUrl = `${window.location.origin}?asset=${encodeURIComponent(JSON.stringify({ id, name, data }))}`;

  const handleCopy = async () => {
    const assetData = JSON.stringify(data);
    try {
      await navigator.clipboard.writeText(assetData);
      toast.success("Asset data copied to clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Asset downloaded");
  };

  return (
    <>
      <Card className={`p-4 hover:border-foreground/20 transition-colors relative ${isSelected ? 'ring-2 ring-primary' : ''}`}>
        {bulkMode && onSelect && (
          <div className="absolute top-2 right-2 z-10">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelect(id)}
              className="bg-background"
            />
          </div>
        )}
        <div className="space-y-3">
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
            {preview}
          </div>
          <div className="space-y-2">
            <p className="truncate">{name}</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={handleCopy}
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={handleShare}
              >
                <Share2 className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={handleDownload}
              >
                <Download className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => onDelete(id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <ShareDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        shareUrl={shareUrl}
        title="Share Asset"
        description="Copy this link to share the asset with others"
      />
    </>
  );
}
