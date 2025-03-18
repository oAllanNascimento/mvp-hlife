"use client"

import { useState } from "react"
import { Calendar, Clock, Users, Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function AppointmentsPage() {
  const [view, setView] = useState<"weekly" | "monthly" | "column">("weekly")

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold">Agendamentos</h1>
          <p className="text-muted-foreground">
            Gerencie seus agendamentos e visualize a agenda
          </p>
        </div>
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          Criar Agenda
        </Button>
      </div>

      <Separator />

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Agendamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                +5% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Agendamentos Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                3 confirmados, 9 pendentes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Taxa de Comparecimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <p className="text-xs text-muted-foreground">
                +2% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="calendar" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="calendar">Calendário</TabsTrigger>
                <TabsTrigger value="list">Lista</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button
                  variant={view === "monthly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("monthly")}
                >
                  Mensal
                </Button>
                <Button
                  variant={view === "weekly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("weekly")}
                >
                  Semanal
                </Button>
                <Button
                  variant={view === "column" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("column")}
                >
                  Colunas
                </Button>
              </div>
            </div>
            <TabsContent value="calendar" className="mt-4">
              <Card>
                <CardContent className="p-0">
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
                          <CalendarIcon className="h-4 w-4" />
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
                            const isToday = day === 15;
                            const isSelected = day === 18;
                            return (
                              <button
                                key={i}
                                className={`rounded-full p-1 text-sm ${
                                  isToday ? "bg-muted" : ""
                                } ${
                                  isSelected ? "bg-primary text-primary-foreground" : ""
                                }`}
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
                        {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((time, i) => (
                          <Button key={i} variant="outline" className="justify-start">
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="list">
              <Card>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Calendar className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">Sem agendamentos</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Não há agendamentos para mostrar neste momento.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 