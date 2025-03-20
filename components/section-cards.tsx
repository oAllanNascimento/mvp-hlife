"use client"

import { Calendar, CheckCircle, Clock, Users } from "lucide-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAppointments, getAppointmentsByDateRange } from "@/lib/db"

// Interface para as estatísticas de agendamentos
interface AppointmentStats {
  total: number
  confirmed: number
  completed: number
  cancelled: number
  pendingToday: number
  loadingError: boolean
}

// Tipo para os agendamentos
interface Appointment {
  status: string;
}

export function SectionCards() {
  const [stats, setStats] = useState<AppointmentStats>({
    total: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    pendingToday: 0,
    loadingError: false
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        // Obter todos os agendamentos
        const appointments = await getAppointments() || []
        
        // Calcular estatísticas
        const total = appointments.length
        const confirmed = appointments.filter((app: Appointment) => app.status === 'CONFIRMED').length
        const completed = appointments.filter((app: Appointment) => app.status === 'COMPLETED').length
        const cancelled = appointments.filter((app: Appointment) => app.status === 'CANCELLED').length
        
        // Calcular agendamentos pendentes para hoje
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        
        const todayAppointments = await getAppointmentsByDateRange(today, tomorrow) || []
        const pendingToday = todayAppointments.filter(
          (app: Appointment) => app.status === 'SCHEDULED' || app.status === 'CONFIRMED'
        ).length
        
        setStats({
          total,
          confirmed,
          completed,
          cancelled,
          pendingToday,
          loadingError: false
        })
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error)
        setStats(prev => ({ ...prev, loadingError: true }))
      } finally {
        setIsLoading(false)
      }
    }
    
    loadStats()
  }, [])

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Agendamentos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? "..." : stats.total}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              Total
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Todos os agendamentos do sistema
          </div>
          <div className="text-muted-foreground">
            {stats.loadingError ? "Erro ao carregar dados" : "Atualizado agora"}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Agendamentos Confirmados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? "..." : stats.confirmed}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950">
              <Users className="h-3 w-3 mr-1" />
              Confirmados
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Aguardando atendimento
          </div>
          <div className="text-muted-foreground">
            {stats.loadingError ? "Erro ao carregar dados" : "Agendamentos confirmados"}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Atendimentos Realizados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? "..." : stats.completed}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-green-50 dark:bg-green-950">
              <CheckCircle className="h-3 w-3 mr-1" />
              Concluídos
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Atendimentos finalizados
          </div>
          <div className="text-muted-foreground">
            {stats.loadingError ? "Erro ao carregar dados" : "Total de comparecimentos"}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Agendamentos para Hoje</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? "..." : stats.pendingToday}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950">
              <Calendar className="h-3 w-3 mr-1" />
              Hoje
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Previstos para hoje
          </div>
          <div className="text-muted-foreground">
            {stats.loadingError ? "Erro ao carregar dados" : "Agendamentos pendentes para hoje"}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
