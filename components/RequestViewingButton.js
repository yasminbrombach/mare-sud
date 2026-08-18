"use client";

import { useState } from "react";
import LeadForm from "./LeadForm";

export default function RequestViewingButton({ propertyId, subtitle }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-sm px-4 py-3 rounded-full font-medium"
        style={{ background: "#B8924A", color: "#16283F" }}
      >
        Besichtigung anfragen
      </button>

      <LeadForm
        open={open}
        onClose={() => setOpen(false)}
        type="viewing"
        subtitle={subtitle}
        propertyId={propertyId}
      />
    </>
  );
}
