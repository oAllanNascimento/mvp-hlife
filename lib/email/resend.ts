import { Resend } from 'resend';
import { ReactElement } from 'react';

// Inicializa o cliente Resend com a API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Interface para os dados do email
export interface EmailData {
  to: string[];
  subject: string;
  react: ReactElement;
  from?: string;
}

// Função para enviar email
export const sendEmail = async ({ to, subject, react, from = process.env.EMAIL_FROM || 'onboarding@resend.dev' }: EmailData) => {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      react,
    });

    if (error) {
      console.error('Erro ao enviar email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exceção ao enviar email:', error);
    return { success: false, error };
  }
}; 