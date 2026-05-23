"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

const schema = z.object({
  name: z.string().min(2).max(80),
  venueType: z.enum(["cafe", "gym", "park", "school", "hotel", "other"]),
  email: z.string().email(),
  message: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

export function PartnerForm() {
  const { t } = useI18n();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { venueType: "cafe" } });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Submission failed");
      toast.success(t.partners.form.success);
      reset();
    } catch {
      toast.error(t.partners.form.error);
    } finally {
      setSubmitting(false);
    }
  };

  const venueTypes = Object.entries(t.partners.form.venueTypes) as Array<[FormValues["venueType"], string]>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-paper text-ink p-8 md:p-10 space-y-7 shadow-xl">
      <div className="space-y-2">
        <Label htmlFor="name">{t.partners.form.name}</Label>
        <Input id="name" autoComplete="name" {...register("name")} aria-invalid={!!errors.name} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t.partners.form.email}</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} />
      </div>

      <div className="space-y-3">
        <Label>{t.partners.form.venueType}</Label>
        <div className="flex flex-wrap gap-2">
          {venueTypes.map(([key, label]) => (
            <label
              key={key}
              className="relative cursor-pointer"
            >
              <input
                type="radio"
                value={key}
                {...register("venueType")}
                className="peer sr-only"
              />
              <span className="block px-4 py-2 border border-ink/15 font-display text-sm tracking-wider text-ink/70 peer-checked:bg-ink peer-checked:text-coral peer-checked:border-ink transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t.partners.form.message}</Label>
        <Textarea id="message" rows={3} {...register("message")} maxLength={500} />
      </div>

      <Button type="submit" variant="ink" size="lg" disabled={submitting} className="w-full">
        {submitting ? t.partners.form.sending : t.partners.form.submit}
      </Button>
    </form>
  );
}
