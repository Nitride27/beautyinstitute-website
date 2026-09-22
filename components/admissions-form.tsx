"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { courses } from "@/content/courses";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  course: z.string().min(1, "Please select a course."),
  message: z.string().min(10, "Tell us a little more (10+ characters)."),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  "w-full rounded-[0px] border border-mist bg-bone px-3 py-2 font-basis-grotesque-pro text-[14px] text-ink-black placeholder:text-stone focus:border-ink-black focus:outline-none";

export default function AdmissionsForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    // Stub submit — swap in real CRM/email endpoint later (Phase 5).
    console.log("Admissions inquiry:", values);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-[0px] border border-ink-black bg-pure-white p-6">
        <h3 className="font-gascognets text-[25px] font-medium">
          Message received.
        </h3>
        <p className="mt-2 font-basis-grotesque-pro text-[16px] text-charcoal">
          Thank you — our admissions team will be in touch within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="af-name" className="font-basis-grotesque-pro text-[14px]">
          Full Name *
        </label>
        <input id="af-name" placeholder="Your name" className={inputCls} {...register("name")} />
        {errors.name && <p className="mt-1 text-[13px] text-coral-pop">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="af-email" className="font-basis-grotesque-pro text-[14px]">
          Email Address *
        </label>
        <input id="af-email" placeholder="you@example.com" className={inputCls} {...register("email")} />
        {errors.email && <p className="mt-1 text-[13px] text-coral-pop">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="af-phone" className="font-basis-grotesque-pro text-[14px]">
          Phone *
        </label>
        <input id="af-phone" placeholder="+977 980 123 4567" className={inputCls} {...register("phone")} />
        {errors.phone && <p className="mt-1 text-[13px] text-coral-pop">{errors.phone.message}</p>}
      </div>
      <div>
        <label htmlFor="af-course" className="font-basis-grotesque-pro text-[14px]">
          Course Interested In *
        </label>
        <select id="af-course" className={inputCls} defaultValue="" {...register("course")}>
          <option value="" disabled>
            Select course
          </option>
          {courses.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
        {errors.course && <p className="mt-1 text-[13px] text-coral-pop">{errors.course.message}</p>}
      </div>
      <div>
        <label htmlFor="af-message" className="font-basis-grotesque-pro text-[14px]">
          Message
        </label>
        <textarea
          id="af-message"
          rows={4}
          placeholder="How can we help you?"
          className={inputCls}
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-[13px] text-coral-pop">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer rounded-[999px] bg-coral-pop px-[19px] py-[6px] font-basis-grotesque-pro text-[16px] text-pure-white transition-colors duration-300 hover:bg-ink-black active:scale-[0.97] disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send Message →"}
      </button>
    </form>
  );
}
