import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CustomSheetProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  sheetTitle?: string;
  sheetDescription?: string;
  open: boolean;
  onCloseAction: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CustomSheet({
  trigger = <Button variant="outline">Open</Button>,
  sheetTitle = "Sheet Title",
  sheetDescription = "Sheet Description",
  children,
  open = false,
  onCloseAction,
}: CustomSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onCloseAction}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4">
          {sheetTitle && <SheetTitle>{sheetTitle}</SheetTitle>}
          {sheetDescription && (
            <SheetDescription>{sheetDescription}</SheetDescription>
          )}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
