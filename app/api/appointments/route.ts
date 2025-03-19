import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendConfirmationEmail } from '@/lib/email/email-service';
import { prisma } from '@/lib/db';

// Schema de validação para o corpo da requisição
const appointmentSchema = z.object({
  agendaId: z.string(),
  clientName: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  clientEmail: z.string().email({ message: 'Email inválido' }),
  clientPhone: z.string().min(8, { message: 'Telefone inválido' }),
  notes: z.string().optional(),
  date: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    { message: 'Data inválida' }
  ),
});

export async function POST(request: Request) {
  try {
    // Parsear o corpo da requisição
    const body = await request.json();
    
    // Validar o corpo da requisição
    const validationResult = appointmentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos', 
          details: validationResult.error.format() 
        },
        { status: 400 }
      );
    }
    
    const appointment = validationResult.data;
    
    // Verificar se a agenda existe
    const agenda = await prisma.agenda.findUnique({
      where: { id: appointment.agendaId },
      include: { professional: true }
    });
    
    if (!agenda) {
      return NextResponse.json(
        { error: 'Agenda não encontrada' },
        { status: 404 }
      );
    }
    
    // Verificar disponibilidade
    // Aqui você implementaria a lógica para verificar se o horário está disponível
    
    // Criar o agendamento no banco de dados
    const newAppointment = await prisma.appointment.create({
      data: {
        agendaId: appointment.agendaId,
        clientName: appointment.clientName,
        clientEmail: appointment.clientEmail,
        clientPhone: appointment.clientPhone,
        notes: appointment.notes || '',
        date: new Date(appointment.date),
        status: 'confirmed',
      },
    });
    
    // Enviar email de confirmação
    await sendConfirmationEmail({
      id: newAppointment.id,
      clientName: newAppointment.clientName,
      clientEmail: newAppointment.clientEmail,
      date: newAppointment.date,
      serviceName: agenda.serviceName,
      professionalName: agenda.professional ? agenda.professional.name : 'Profissional',
      location: agenda.location || 'A definir',
    });
    
    // Retornar sucesso
    return NextResponse.json({
      success: true,
      message: 'Agendamento criado com sucesso',
      appointmentId: newAppointment.id,
    });
  } catch (error) {
    console.error('Erro ao processar criação de agendamento:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar agendamento', details: error },
      { status: 500 }
    );
  }
} 