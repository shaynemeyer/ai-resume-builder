import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

interface CustomSheetProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  sheetTitle?: string;
  sheetDescription?: string;
  sheetCloseText?: string;
  data?: unknown;
  open: boolean;
  setClose?: Dispatch<SetStateAction<boolean>>;
}

export function CustomSheet({
  trigger = <Button variant="outline">Open</Button>,
  sheetTitle = "Sheet Title",
  sheetDescription = "Sheet Description",
  children,
  handleSubmit,
  sheetCloseText = "Save ",
}: CustomSheetProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
