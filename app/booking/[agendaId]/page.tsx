"use client"

import { useState } from "react"
import { ChevronLeft, Calendar, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function PublicBookingPage({
  params,
}: {
  params: { agendaId: string }
}) {
  const [step, setStep] = useState<"date" | "details">("date")
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep("details")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica para enviar o agendamento
    alert("Agendamento realizado com sucesso!")
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="bg-background sticky top-0 z-10 border-b">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Agenda HealthLife</span>
          </div>
          <div>
            <Button variant="ghost" size="sm">
              Ajuda
            </Button>
          </div>
        </div>
      </header>

      <main className="container flex-1 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Consulta Médica</h1>
            <p className="text-muted-foreground mt-2">
              Agenda ID: {params.agendaId}
            </p>
          </div>

          {step === "date" ? (
            <div className="grid gap-6 md:grid-cols-[1fr_300px]">
              <Card>
                <CardHeader>
                  <CardTitle>Selecione uma data e horário</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="[--booker-timeslots-width:240px] lg:[--booker-timeslots-width:280px] [--booker-meta-width:240px] [--booker-main-width:480px] lg:[--booker-meta-width:280px] bg-default dark:bg-muted grid max-w-full items-start dark:[color-scheme:dark] sm:motion-reduce:transition-none md:flex-row rounded-md sm:transition-[width] sm:duration-300 border-subtle border"
                    style={{
                      gridTemplateAreas: "\"meta main timeslots\" \"meta main timeslots\"",
                      width: "calc(var(--booker-meta-width) + var(--booker-main-width) + var(--booker-timeslots-width))",
                      gridTemplateColumns: "var(--booker-meta-width) 1fr var(--booker-timeslots-width)",
                      gridTemplateRows: "1fr 0fr",
                      minHeight: "450px",
                      height: "auto"
                    }}
                  >
                    {/* Área de Meta-informações */}
                    <div className="border-subtle [grid-area:meta] flex flex-col border-r p-5">
                      <h2 className="text-emphasis font-medium">Detalhes</h2>
                      <div className="mt-4 grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>60 minutos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>1-a-1</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Horário local (GMT-3)</span>
                        </div>
                      </div>
                    </div>

                    {/* Área Principal do Calendário */}
                    <div className="border-subtle [grid-area:main] flex flex-col border-r">
                      <div className="bg-default px-5 py-3 text-center">
                        <h3 className="font-medium">Julho 2024</h3>
                        <div className="mt-4 grid grid-cols-7 gap-1">
                          {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
                            <div key={i} className="text-xs text-muted-foreground">
                              {day}
                            </div>
                          ))}
                          {Array.from({ length: 31 }).map((_, i) => {
                            const day = i + 1;
                            const dateStr = `2024-07-${day.toString().padStart(2, "0")}`;
                            const isToday = day === 15;
                            const isSelected = selectedDate === dateStr;
                            return (
                              <button
                                key={i}
                                className={`rounded-full p-1 text-sm ${
                                  isToday ? "bg-muted" : ""
                                } ${
                                  isSelected ? "bg-primary text-primary-foreground" : ""
                                }`}
                                onClick={() => handleDateSelect(dateStr)}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Área dos Horários */}
                    <div className="[grid-area:timeslots] flex flex-col p-5">
                      <h3 className="text-emphasis mb-4 font-medium">Horários Disponíveis</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedDate ? (
                          ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((time, i) => (
                            <Button 
                              key={i} 
                              variant="outline" 
                              className="justify-start"
                              onClick={() => handleTimeSelect(time)}
                            >
                              {time}
                            </Button>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            Selecione uma data para ver os horários disponíveis
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre este agendamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Consulta médica com duração de 60 minutos. 
                      Por favor, chegue com 15 minutos de antecedência.
                    </p>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Localização:</span>
                      <span className="text-sm text-muted-foreground">Sala 302, Bloco A</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mr-2"
                    onClick={() => setStep("date")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <CardTitle>Complete os detalhes do agendamento</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Data selecionada:</span>
                      <span className="text-sm text-muted-foreground">
                        {selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : ''} às {selectedTime}
                      </span>
                    </div>
                    <Separator />
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input id="name" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Observações (opcional)</Label>
                      <textarea
                        id="notes"
                        className="border p-2 rounded-md"
                        placeholder="Compartilhe informações adicionais relevantes"
                        rows={3}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Confirmar Agendamento
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HealthLife. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
} 