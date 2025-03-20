import { PrismaClient } from '@prisma/client';

// Inicializa o cliente Prisma
const prisma = new PrismaClient();

// Exporta o cliente Prisma
export { prisma };

// User-related operations
export const getUsers = async () => {
  return prisma.user.findMany();
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// Schedule-related operations
export const getSchedules = async () => {
  return prisma.schedule.findMany({
    include: {
      manager: true,
      professionals: true,
    },
  });
};

export const getScheduleById = async (id: string) => {
  return prisma.schedule.findUnique({
    where: { id },
    include: {
      manager: true,
      professionals: true,
      availabilities: true,
    },
  });
};

export const getScheduleByUrl = async (publicUrl: string) => {
  return prisma.schedule.findUnique({
    where: { publicUrl },
    include: {
      availabilities: true,
      professionals: true,
    },
  });
};

export const getSchedulesByManager = async (managerId: string) => {
  return prisma.schedule.findMany({
    where: { managerId },
    include: {
      professionals: true,
    },
  });
};

export const getSchedulesByProfessional = async (professionalId: string) => {
  return prisma.schedule.findMany({
    where: {
      professionals: {
        some: {
          id: professionalId,
        },
      },
    },
    include: {
      manager: true,
    },
  });
};

// Appointment-related operations
export const getAppointments = async () => {
  try {
    return await prisma.appointment.findMany({
      include: {
        schedule: true,
        professional: true,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    
    if (process.env.NODE_ENV === 'development') {
      // Dados de fallback para desenvolvimento
      return getMockAppointments();
    }
    
    return [];
  }
};

export const getAppointmentById = async (id: string) => {
  try {
    return await prisma.appointment.findUnique({
      where: { id },
      include: {
        schedule: true,
        professional: true,
      },
    });
  } catch (error) {
    console.error(`Erro ao buscar agendamento por ID ${id}:`, error);
    return null;
  }
};

export const getAppointmentsBySchedule = async (scheduleId: string) => {
  try {
    return await prisma.appointment.findMany({
      where: { scheduleId },
      include: {
        professional: true,
      },
      orderBy: { date: 'asc' },
    });
  } catch (error) {
    console.error(`Erro ao buscar agendamentos por agenda ${scheduleId}:`, error);
    return [];
  }
};

export const getAppointmentsByProfessional = async (professionalId: string) => {
  try {
    return await prisma.appointment.findMany({
      where: { professionalId },
      include: {
        schedule: true,
      },
      orderBy: { date: 'asc' },
    });
  } catch (error) {
    console.error(`Erro ao buscar agendamentos por profissional ${professionalId}:`, error);
    return [];
  }
};

export const getAppointmentsByDateRange = async (
  startDate: Date,
  endDate: Date,
  scheduleId?: string,
  professionalId?: string
) => {
  try {
    const where: {
      date: { gte: Date; lte: Date };
      scheduleId?: string;
      professionalId?: string;
    } = {
      date: {
        gte: startDate,
        lte: endDate,
      },
    };

    if (scheduleId) {
      where.scheduleId = scheduleId;
    }

    if (professionalId) {
      where.professionalId = professionalId;
    }

    return await prisma.appointment.findMany({
      where,
      include: {
        schedule: true,
        professional: true,
      },
      orderBy: { date: 'asc' },
    });
  } catch (error) {
    console.error(`Erro ao buscar agendamentos por intervalo de datas:`, error);
    
    if (process.env.NODE_ENV === 'development') {
      // Dados de fallback para desenvolvimento
      return getMockAppointmentsByDateRange(startDate, endDate);
    }
    
    return [];
  }
};

// Funções auxiliares para fornecer dados de fallback durante o desenvolvimento
function getMockAppointments() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  return [
    {
      id: '1',
      scheduleId: 'schedule1',
      clientName: 'João Silva',
      clientEmail: 'joao@example.com',
      date: today,
      startTime: '09:00',
      endTime: '10:00',
      status: 'SCHEDULED',
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      professionalId: 'prof1',
      schedule: { title: 'Agenda 1' },
      professional: { name: 'Dr. Carlos' }
    },
    {
      id: '2',
      scheduleId: 'schedule1',
      clientName: 'Maria Oliveira',
      clientEmail: 'maria@example.com',
      date: today,
      startTime: '10:00',
      endTime: '11:00',
      status: 'CONFIRMED',
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      professionalId: 'prof1',
      schedule: { title: 'Agenda 1' },
      professional: { name: 'Dr. Carlos' }
    },
    {
      id: '3',
      scheduleId: 'schedule2',
      clientName: 'Pedro Santos',
      clientEmail: 'pedro@example.com',
      date: tomorrow,
      startTime: '14:00',
      endTime: '15:00',
      status: 'COMPLETED',
      notes: 'Atendimento realizado com sucesso',
      createdAt: new Date(),
      updatedAt: new Date(),
      professionalId: 'prof2',
      schedule: { title: 'Agenda 2' },
      professional: { name: 'Dra. Ana' }
    },
    {
      id: '4',
      scheduleId: 'schedule2',
      clientName: 'Ana Souza',
      clientEmail: 'ana@example.com',
      date: tomorrow,
      startTime: '15:00',
      endTime: '16:00',
      status: 'CANCELLED',
      notes: 'Cliente cancelou',
      createdAt: new Date(),
      updatedAt: new Date(),
      professionalId: 'prof2',
      schedule: { title: 'Agenda 2' },
      professional: { name: 'Dra. Ana' }
    },
    {
      id: '5',
      scheduleId: 'schedule1',
      clientName: 'Carlos Mendes',
      clientEmail: 'carlos@example.com',
      date: nextWeek,
      startTime: '11:00',
      endTime: '12:00',
      status: 'SCHEDULED',
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      professionalId: 'prof1',
      schedule: { title: 'Agenda 1' },
      professional: { name: 'Dr. Carlos' }
    }
  ];
}

function getMockAppointmentsByDateRange(startDate: Date, endDate: Date) {
  // Filtra os agendamentos mock pela data
  const allAppointments = getMockAppointments();
  return allAppointments.filter(app => {
    const appDate = new Date(app.date);
    return appDate >= startDate && appDate <= endDate;
  });
} 