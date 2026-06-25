"use client";
import { sendEmail } from "../actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-neutral-800 transition-colors disabled:bg-neutral-500"
    >
      {pending ? "Sending..." : "Send Message"}
    </motion.button>
  );
}

export default function Contact() {
  const [state, formAction] = useActionState(sendEmail, { success: false, message: "" });

  return (
    <section id="contact" className="bg-slate-50 py-20 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6">
            Let's Work Together
          </motion.h2>

          <motion.form
            action={formAction}
            className="space-y-6 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.input name="name" required variants={fadeUp} type="text" placeholder="Your Name" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" />
              <motion.input name="email" required variants={fadeUp} type="email" placeholder="Your Email" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" />
            </div>

            <motion.textarea name="message" required variants={fadeUp} placeholder="Tell me about your project..." rows={5} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" />

            <SubmitButton />

            {state.message && (
              <p className={state.success ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {state.message}
              </p>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}