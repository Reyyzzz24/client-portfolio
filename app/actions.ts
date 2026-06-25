"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'ryuliansatria04@gmail.com',
      subject: `Pesan baru dari ${name}`,
      text: `Dari: ${email}\n\nPesan: ${message}`,
    });
    return { success: true, message: "Email berhasil dikirim!" };
  } catch (error) {
    return { success: false, message: "Gagal mengirim email." };
  }
}