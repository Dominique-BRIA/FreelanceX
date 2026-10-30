"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Bouton } from "@/components/ui";

export function Enregistrer() {
  const [fait, setFait] = useState(false);
  return (
    <div className="flex items-center justify-end gap-4">
      {fait && (
        <span className="flex items-center gap-1.5 text-sm font-medium text-trust-dark">
          <CheckCircle2 className="size-4" /> Paramètres enregistrés
        </span>
      )}
      <Bouton onClick={() => setFait(true)}>Enregistrer</Bouton>
    </div>
  );
}
