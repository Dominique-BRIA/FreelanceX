"use client";

import { useState } from "react";
import { BadgeCheck, Smartphone } from "lucide-react";
import { Badge, Bouton, Card } from "@/components/ui";
import { Modale } from "@/components/modale";
import { useDemo } from "@/components/demo-store";
import { fcfa } from "@/lib/format";

export function StatutCertification() {
  const { certificationJusqua, renouvelerCertification } = useDemo();
  const [ouverte, setOuverte] = useState(false);
  const renouvelee = certificationJusqua !== "14 janvier 2027";

  return (
    <Card className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
      <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-trust-50 text-trust">
        <BadgeCheck className="size-7" />
      </span>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-bold text-ink">Identité vérifiée</h2>
          <Badge ton="trust">{renouvelee ? "Renouvelée" : "Active"}</Badge>
        </div>
        <p className="mt-1 text-sm text-muted">
          Valable jusqu&apos;au {certificationJusqua}. Vous serez prévenu un mois avant l&apos;expiration.
        </p>
      </div>
      <Bouton variante="contour" disabled={renouvelee} onClick={() => setOuverte(true)}>
        {renouvelee ? "Déjà renouvelée" : `Renouveler · ${fcfa(10000)}`}
      </Bouton>

      {ouverte && (
        <Modale titre="Renouveler la certification" onFermer={() => setOuverte(false)}>
          <p className="text-sm text-muted">
            Vos documents sont toujours valables : un membre de l&apos;équipe vérifie simplement qu&apos;ils n&apos;ont pas
            expiré. Le badge est prolongé d&apos;un an.
          </p>
          <label className="mt-5 flex items-center gap-3 rounded-xl border border-line p-3">
            <Smartphone className="size-5 text-brand" />
            <input placeholder="Numéro Mobile Money" inputMode="tel" className="w-full bg-transparent text-sm outline-none" />
          </label>
          <Bouton
            variante="action"
            className="mt-5 w-full"
            onClick={() => {
              renouvelerCertification();
              setOuverte(false);
            }}
          >
            Payer {fcfa(10000)}
          </Bouton>
        </Modale>
      )}
    </Card>
  );
}
