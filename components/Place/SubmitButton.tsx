"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  readyContent?: ReactNode;
  pendingContent?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({
  readyContent = "Submit",
  pendingContent = "Pending...",
  ...atts
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} {...atts}>
      {pending ? pendingContent : readyContent}
    </button>
  );
}
