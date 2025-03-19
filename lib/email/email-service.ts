import { sendEmail } from './resend';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ConfirmationEmail from './templates/confirmation-email';
import CancellationEmail from './templates/cancellation-email';

// Interface para os dados do agendamento
interface AppointmentData {
  id: string;
  clientName: string;
  clientEmail: string;
  date: Date;
  serviceName: string;
  professionalName: string;
  location: string;
}

/**
 * Envia um email de confirmação de agendamento
 */
export const sendConfirmationEmail = async (appointment: AppointmentData) => {
  const formattedDate = format(appointment.date, 'PPP', { locale: ptBR });
  const formattedTime = format(appointment.date, 'HH:mm', { locale: ptBR });
  
  // URL para cancelamento do agendamento (deve ser substituída pela URL real)
  const cancellationLink = `${process.env.NEXT_PUBLIC_APP_URL}/cancel/${appointment.id}`;
  
  return sendEmail({
    to: [appointment.clientEmail],
    subject: `Confirmação: Seu agendamento para ${appointment.serviceName}`,
    react: ConfirmationEmail({
      name: appointment.clientName,
      date: formattedDate,
      time: formattedTime,
      serviceName: appointment.serviceName,
      professionalName: appointment.professionalName,
      location: appointment.location,
      cancellationLink,
    }),
  });
};

/**
 * Envia um email de cancelamento de agendamento
 */
export const sendCancellationEmail = async (appointment: AppointmentData) => {
  const formattedDate = format(appointment.date, 'PPP', { locale: ptBR });
  const formattedTime = format(appointment.date, 'HH:mm', { locale: ptBR });
  
  // URL para reagendamento (deve ser substituída pela URL real)
  const rebookingLink = `${process.env.NEXT_PUBLIC_APP_URL}/booking`;
  
  return sendEmail({
    to: [appointment.clientEmail],
    subject: `Cancelamento: Seu agendamento para ${appointment.serviceName}`,
    react: CancellationEmail({
      name: appointment.clientName,
      date: formattedDate,
      time: formattedTime,
      serviceName: appointment.serviceName,
      professionalName: appointment.professionalName,
      rebookingLink,
    }),
  });
};

/**
 * Função para simular o envio de email (para testes)
 */
export const simulateEmailSend = async (type: 'confirmation' | 'cancellation') => {
  // Dados fictícios para teste
  const testAppointment: AppointmentData = {
    id: 'test-123',
    clientName: 'Cliente Teste',
    clientEmail: 'teste@example.com',
    date: new Date(),
    serviceName: 'Consulta de Teste',
    professionalName: 'Dr. Teste',
    location: 'Clínica Teste',
  };
  
  if (type === 'confirmation') {
    return sendConfirmationEmail(testAppointment);
  } else {
    return sendCancellationEmail(testAppointment);
  }
}; 