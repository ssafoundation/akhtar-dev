"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  budget: z.string().min(1, "Select a budget range."),
  message: z.string().min(12, "Tell me a little more about the project."),
});

type FormValues = z.infer<typeof schema>;

type ContactResponse = {
  success?: boolean;
  message?: string;
};

export function ContactForm() {
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      name: "",
      email: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerMessage("");
    setServerError("");

    try {
      const response = await apiFetch<ContactResponse>("/contact", {
        method: "POST",
        body: {
          name: values.name,
          email: values.email,
          budget: values.budget,
          message: values.message,
        },
      });

      if (response?.success === false) {
        throw new Error(
          response.message || "Something went wrong. Please try again.",
        );
      }

      setServerMessage(
        response?.message ||
          "Thank you. Your inquiry has been received. I will get back to you shortly.",
      );

      reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setServerError(
        error instanceof Error
          ? error.message
          : "Unable to send your inquiry. Please try again.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="glass rounded-[8px] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            className="field"
            placeholder="Your name"
            disabled={isSubmitting}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            className="field"
            placeholder="you@company.com"
            disabled={isSubmitting}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Budget" error={errors.budget?.message}>
          <select
            {...register("budget")}
            className="field"
            disabled={isSubmitting}
          >
            <option value="">Select range</option>
            <option value="$2,000 - $5,000">$2,000 - $5,000</option>
            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
            <option value="$10,000+">$10,000+</option>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Project Brief" error={errors.message?.message}>
          <textarea
            {...register("message")}
            className="field min-h-36 resize-y"
            placeholder="Platform, timeline, goals, and what needs to feel premium."
            disabled={isSubmitting}
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Inquiry"
          )}
        </Button>

        <span className="inline-flex items-center gap-2 text-sm text-muted">
          <Send className="h-4 w-4 text-accent" />
          Response usually within one business day
        </span>
      </div>

      {serverMessage ? (
        <p className="mt-5 rounded-[8px] border border-accent/30 bg-accent/10 p-4 text-sm text-white">
          {serverMessage}
        </p>
      ) : null}

      {serverError ? (
        <p className="mt-5 rounded-[8px] border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
          {serverError}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white">
        {label}
      </span>

      {children}

      {error ? (
        <span className="mt-2 block text-sm text-red-300">{error}</span>
      ) : null}
    </label>
  );
}
