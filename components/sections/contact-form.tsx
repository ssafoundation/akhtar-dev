"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  budget: z.string().min(1, "Select a budget range."),
  message: z.string().min(12, "Tell me a little more about the project.")
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      budget: "",
      message: ""
    }
  });

  const onSubmit = (values: FormValues) => {
    const subject = encodeURIComponent(`Project inquiry from ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nBudget: ${values.budget}\n\nProject brief:\n${values.message}`
    );
    window.location.href = `mailto:hello@akhtardev.com?subject=${subject}&body=${body}`;
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-[8px] p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input {...register("name")} className="field" placeholder="Your name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register("email")} className="field" placeholder="you@company.com" />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Budget" error={errors.budget?.message}>
          <select {...register("budget")} className="field">
            <option value="">Select range</option>
            <option>$2,000 - $5,000</option>
            <option>$5,000 - $10,000</option>
            <option>$10,000+</option>
          </select>
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Project Brief" error={errors.message?.message}>
          <textarea {...register("message")} className="field min-h-36 resize-y" placeholder="Platform, timeline, goals, and what needs to feel premium." />
        </Field>
      </div>
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit">Send Inquiry</Button>
        <span className="inline-flex items-center gap-2 text-sm text-muted">
          <Send className="h-4 w-4 text-accent" />
          Response usually within one business day
        </span>
      </div>
      {isSubmitSuccessful ? (
        <p className="mt-5 rounded-[8px] border border-accent/30 bg-accent/10 p-4 text-sm text-white">
          Your email client is opening with the project brief prepared for hello@akhtardev.com.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-red-300">{error}</span> : null}
    </label>
  );
}
