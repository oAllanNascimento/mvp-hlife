import { prisma } from './prisma';

// Check if a time slot conflicts with existing appointments
export const checkForConflicts = async (
  scheduleId: string,
  date: Date,
  startTime: string,
  endTime: string,
  professionalId?: string,
  excludeAppointmentId?: string
): Promise<boolean> => {
  // Find any overlapping appointments
  const overlappingAppointments = await prisma.appointment.findMany({
    where: {
      scheduleId,
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      },
      status: {
        not: 'CANCELLED',
      },
      // If a professional is specified, only check conflicts for that professional
      ...(professionalId ? { professionalId } : {}),
      // Exclude the current appointment if we're updating one
      ...(excludeAppointmentId ? { id: { not: excludeAppointmentId } } : {}),
      // Check for time overlap
      OR: [
        // New appointment starts during an existing appointment
        {
          startTime: { lte: startTime },
          endTime: { gt: startTime },
        },
        // New appointment ends during an existing appointment
        {
          startTime: { lt: endTime },
          endTime: { gte: endTime },
        },
        // New appointment contains an existing appointment
        {
          startTime: { gte: startTime },
          endTime: { lte: endTime },
        },
      ],
    },
  });

  // Return true if conflicts exist
  return overlappingAppointments.length > 0;
};

// Get all conflicting appointments
export const getConflictingAppointments = async (
  scheduleId: string,
  date: Date,
  startTime: string,
  endTime: string,
  professionalId?: string
) => {
  return prisma.appointment.findMany({
    where: {
      scheduleId,
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      },
      status: {
        not: 'CANCELLED',
      },
      ...(professionalId ? { professionalId } : {}),
      OR: [
        {
          startTime: { lte: startTime },
          endTime: { gt: startTime },
        },
        {
          startTime: { lt: endTime },
          endTime: { gte: endTime },
        },
        {
          startTime: { gte: startTime },
          endTime: { lte: endTime },
        },
      ],
    },
    include: {
      professional: true,
    },
  });
}; 