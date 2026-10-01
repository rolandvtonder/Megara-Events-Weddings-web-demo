"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { EnquiryForm } from "./EnquiryForm";

function FromURL() {
  const service = useSearchParams().get("service") ?? undefined;
  return <EnquiryForm key={service ?? "none"} initialService={service} />;
}

/** Reads ?service= in the browser so the contact page can be pre-rendered as static HTML. */
export function EnquiryFormFromURL() {
  return (
    <Suspense fallback={<EnquiryForm />}>
      <FromURL />
    </Suspense>
  );
}
