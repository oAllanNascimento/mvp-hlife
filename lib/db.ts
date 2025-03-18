import { prisma } from './prisma';

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
  return prisma.appointment.findMany({
    include: {
      schedule: true,
      professional: true,
    },
  });
};

export const getAppointmentById = async (id: string) => {
  return prisma.appointment.findUnique({
    where: { id },
    include: {
      schedule: true,
      professional: true,
    },
  });
};

export const getAppointmentsBySchedule = async (scheduleId: string) => {
  return prisma.appointment.findMany({
    where: { scheduleId },
    include: {
      professional: true,
    },
    orderBy: { date: 'asc' },
  });
};

export const getAppointmentsByProfessional = async (professionalId: string) => {
  return prisma.appointment.findMany({
    where: { professionalId },
    include: {
      schedule: true,
    },
    orderBy: { date: 'asc' },
  });
};

export const getAppointmentsByDateRange = async (
  startDate: Date,
  endDate: Date,
  scheduleId?: string,
  professionalId?: string
) => {
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

  return prisma.appointment.findMany({
    where,
    include: {
      schedule: true,
      professional: true,
    },
    orderBy: { date: 'asc' },
  });
}; 