"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, Clock, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAppointmentsByDateRange } from "@/lib/db"

interface Appointment {
  id: string
  clientName: string
  date: Date
  startTime: string
  status: string
  schedule: {
    title: string
  }
}

export function DashboardRecentAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadRecentAppointments() {
      try {
        setIsLoading(true)
        // Obter agendamentos dos próximos 7 dias
        const today = new Date()
        const nextWeek = new Date()
        nextWeek.setDate(nextWeek.getDate() + 7)
        
        const recentAppointments = await getAppointmentsByDateRange(today, nextWeek) || []
        
        // Limitar aos 5 agendamentos mais próximos
        const sortedAppointments = recentAppointments
          .filter((app: Appointment) => app.status !== 'CANCELLED')
          .sort((a: Appointment, b: Appointment) => {
            // Ordena por data e hora
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            
            if (dateA.getTime() !== dateB.getTime()) {
              return dateA.getTime() - dateB.getTime()
            }
            
            // Se a data for a mesma, ordena por horário
            return a.startTime.localeCompare(b.startTime)
          })
          .slice(0, 5)
        
        setAppointments(sortedAppointments)
      } catch (error) {
        console.error("Erro ao carregar agendamentos recentes:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadRecentAppointments()
  }, [])

  // Função para obter a cor do badge com base no status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
      case 'MISSED':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  // Função para obter o texto do status em português
  const getStatusText = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'Agendado'
      case 'CONFIRMED':
        return 'Confirmado'
      case 'COMPLETED':
        return 'Concluído'
      case 'CANCELLED':
        return 'Cancelado'
      case 'MISSED':
        return 'Faltou'
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximos Agendamentos</CardTitle>
        <CardDescription>
          Agendamentos dos próximos 7 dias
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-muted-foreground">Carregando agendamentos...</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="flex items-center justify-center h-[250px]">
            <p className="text-muted-foreground">Não há agendamentos próximos</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col gap-2 rounded-lg border p-3 text-sm sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {format(new Date(appointment.date), "dd 'de' MMMM", { locale: ptBR })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{appointment.startTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{appointment.clientName}</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Badge className={getStatusColor(appointment.status)}>
                    {getStatusText(appointment.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 