"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { getAppointmentsByDateRange } from "@/lib/db"

export const description = "Gráfico de agendamentos por dia da semana"

// Estrutura dos dados do gráfico
interface AppointmentChartData {
  dayName: string;
  scheduled: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  missed: number;
  total: number;
}

// Tipo dos dados de agendamentos
interface Appointment {
  date: Date;
  status: string;
}

const DAYS_OF_WEEK = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

// Cores para cada status de agendamento
const chartColors = {
  scheduled: "hsl(var(--warning))",
  confirmed: "hsl(var(--primary))",
  completed: "hsl(var(--success))",
  cancelled: "hsl(var(--destructive))",
  missed: "hsl(var(--muted))",
};

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("30d")
  const [chartData, setChartData] = useState<AppointmentChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Inicializar dados do gráfico vazios
  useEffect(() => {
    // Array para armazenar os dados agrupados por dia da semana
    const initialData: AppointmentChartData[] = DAYS_OF_WEEK.map((day) => ({
      dayName: day,
      scheduled: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      missed: 0,
      total: 0
    }));

    setChartData(initialData);
  }, []);

  // Efeito para carregar os dados com base no período selecionado
  useEffect(() => {
    async function loadAppointmentsByDayOfWeek() {
      setIsLoading(true);
      try {
        // Calcular o intervalo de datas conforme o filtro
        const endDate = new Date();
        const startDate = new Date();
        
        if (timeRange === "7d") {
          startDate.setDate(startDate.getDate() - 7);
        } else if (timeRange === "30d") {
          startDate.setDate(startDate.getDate() - 30);
        } else if (timeRange === "90d") {
          startDate.setDate(startDate.getDate() - 90);
        }
        
        // Obter todos os agendamentos no intervalo de datas
        const appointments = await getAppointmentsByDateRange(startDate, endDate) || [];
        
        // Array para armazenar os dados agrupados por dia da semana
        const dayStats: AppointmentChartData[] = DAYS_OF_WEEK.map((day) => ({
          dayName: day,
          scheduled: 0,
          confirmed: 0,
          completed: 0,
          cancelled: 0,
          missed: 0,
          total: 0
        }));
        
        // Processar cada agendamento
        appointments.forEach((appointment: Appointment) => {
          const date = new Date(appointment.date);
          const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, etc.
          
          dayStats[dayOfWeek].total += 1;
          
          switch (appointment.status) {
            case 'SCHEDULED':
              dayStats[dayOfWeek].scheduled += 1;
              break;
            case 'CONFIRMED':
              dayStats[dayOfWeek].confirmed += 1;
              break;
            case 'COMPLETED':
              dayStats[dayOfWeek].completed += 1;
              break;
            case 'CANCELLED':
              dayStats[dayOfWeek].cancelled += 1;
              break;
            case 'MISSED':
              dayStats[dayOfWeek].missed += 1;
              break;
          }
        });
        
        setChartData(dayStats);
      } catch (error) {
        console.error("Erro ao carregar dados de agendamentos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadAppointmentsByDayOfWeek();
  }, [timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Agendamentos por Dia da Semana</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Distribuição dos agendamentos por dia e status
          </span>
          <span className="@[540px]/card:hidden">Distribuição semanal</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30d">Últimos 30 dias</ToggleGroupItem>
            <ToggleGroupItem value="7d">Últimos 7 dias</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Selecionar período"
            >
              <SelectValue placeholder="Últimos 30 dias" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Últimos 3 meses
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Últimos 30 dias
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Últimos 7 dias
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {isLoading ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        ) : (
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="dayName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="scheduled" name="Agendados" fill={chartColors.scheduled} />
                <Bar dataKey="confirmed" name="Confirmados" fill={chartColors.confirmed} />
                <Bar dataKey="completed" name="Concluídos" fill={chartColors.completed} />
                <Bar dataKey="cancelled" name="Cancelados" fill={chartColors.cancelled} />
                <Bar dataKey="missed" name="Faltas" fill={chartColors.missed} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
