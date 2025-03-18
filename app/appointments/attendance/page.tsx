"use client"

import { useState } from "react"
import { Calendar, Check, Clock, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock de dados para exemplificar
const mockAppointments = [
  {
    id: "1",
    name: "Carlos Silva",
    date: "2024-07-15",
    time: "09:00",
    status: "pending",
    email: "carlos@example.com",
    phone: "(11) 98765-4321",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    date: "2024-07-15",
    time: "10:00",
    status: "confirmed",
    email: "maria@example.com",
    phone: "(11) 91234-5678",
  },
  {
    id: "3",
    name: "João Santos",
    date: "2024-07-15",
    time: "11:00",
    status: "completed",
    email: "joao@example.com",
    phone: "(11) 99876-5432",
  },
  {
    id: "4",
    name: "Ana Souza",
    date: "2024-07-15",
    time: "14:00",
    status: "canceled",
    email: "ana@example.com",
    phone: "(11) 95555-1234",
  },
  {
    id: "5",
    name: "Pedro Costa",
    date: "2024-07-16",
    time: "09:00",
    status: "pending",
    email: "pedro@example.com",
    phone: "(11) 98888-7777",
  },
]

export default function AttendancePage() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAppointments = appointments.filter((appointment) => {
    // Filtragem por status
    if (filter !== "all" && appointment.status !== filter) {
      return false
    }

    // Busca por nome ou email
    if (searchQuery && !appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !appointment.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  const markAttendance = (id: string, status: "completed" | "no-show") => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status } : appointment
    ))
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold">Registro de Presença</h1>
          <p className="text-muted-foreground">
            Marque a presença ou ausência dos clientes nos agendamentos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Hoje
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Selecionar Data
          </Button>
        </div>
      </div>

      <Separator />

      <div className="p-4 sm:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Agendamentos</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por nome ou email..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={filter}
                  onValueChange={setFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="confirmed">Confirmados</SelectItem>
                    <SelectItem value="completed">Compareceram</SelectItem>
                    <SelectItem value="no-show">Faltaram</SelectItem>
                    <SelectItem value="canceled">Cancelados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-1 divide-y">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-medium">{appointment.name}</h3>
                          <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(appointment.date).toLocaleDateString("pt-BR")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {appointment.time}
                            </span>
                            <span>{appointment.email}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {appointment.status === "pending" || appointment.status === "confirmed" ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => markAttendance(appointment.id, "completed")}
                              >
                                <Check className="h-4 w-4" />
                                Presente
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => markAttendance(appointment.id, "no-show")}
                              >
                                <X className="h-4 w-4" />
                                Ausente
                              </Button>
                            </>
                          ) : (
                            <div className="flex h-9 items-center px-2">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                appointment.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "no-show"
                                  ? "bg-red-100 text-red-800"
                                  : appointment.status === "canceled"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {appointment.status === "completed"
                                  ? "Compareceu"
                                  : appointment.status === "no-show"
                                  ? "Faltou"
                                  : appointment.status === "canceled"
                                  ? "Cancelado"
                                  : "Confirmado"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <h3 className="text-lg font-medium">Nenhum agendamento encontrado</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Tente ajustar os filtros ou faça uma nova busca
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 