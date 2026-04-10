"use client";

import { useState } from "react";
import { LaborModal } from "@/components/labor-modal";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <Button onClick={() => setOpen(true)}>
        Open Labor Modal
      </Button>

      <LaborModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
