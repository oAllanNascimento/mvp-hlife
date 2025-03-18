"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function CreateAgendaPage() {
  const router = useRouter()
  const [tab, setTab] = useState("basic")

  const handleSave = () => {
    // Simulação de salvar os dados
    router.push("/appointments")
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold">Criar Nova Agenda</h1>
          <p className="text-muted-foreground">
            Configure uma nova agenda para agendamentos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/appointments")}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>

      <Separator />

      <div className="p-4 sm:p-6 lg:p-8">
        <Tabs
          value={tab}
          onValueChange={setTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="schedule">Disponibilidade</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Agenda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="agenda-name">Nome da Agenda</Label>
                    <Input id="agenda-name" placeholder="Ex: Consulta Médica" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (minutos)</Label>
                    <Input id="duration" type="number" placeholder="30" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva o tipo de agenda que está criando..."
                    rows={4}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location">Local</Label>
                    <Input id="location" placeholder="Endereço ou sala" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manager">Gestor Responsável</Label>
                    <Select>
                      <SelectTrigger id="manager">
                        <SelectValue placeholder="Selecione um gestor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="joao">João Silva</SelectItem>
                        <SelectItem value="maria">Maria Souza</SelectItem>
                        <SelectItem value="carlos">Carlos Oliveira</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="public-link" />
                    <Label htmlFor="public-link">
                      Habilitar Link Público de Agendamento
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Esta opção irá gerar um link que permite que clientes agendem
                    sem precisar fazer login
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuração de Disponibilidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dias da Semana</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-7">
                    {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                      (day, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <Switch id={`day-${i}`} />
                          <Label
                            htmlFor={`day-${i}`}
                            className="mt-2"
                          >
                            {day}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Horários</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Horário de Início</Label>
                        <Input id="start-time" type="time" defaultValue="08:00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-time">Horário de Término</Label>
                        <Input id="end-time" type="time" defaultValue="18:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interval">Intervalo entre Agendamentos (minutos)</Label>
                      <Select defaultValue="0">
                        <SelectTrigger id="interval">
                          <SelectValue placeholder="Selecione o intervalo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Sem intervalo</SelectItem>
                          <SelectItem value="5">5 minutos</SelectItem>
                          <SelectItem value="10">10 minutos</SelectItem>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Exceções</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Adicionar Dia Bloqueado
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Você ainda não configurou nenhuma data de exceção.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profissionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Profissionais Associados</h3>
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      Adicionar Profissional
                    </Button>
                  </div>
                  <div className="rounded-md border">
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      Nenhum profissional associado a esta agenda.
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="limit-per-day" />
                    <Label htmlFor="limit-per-day">
                      Limitar Agendamentos por Dia
                    </Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-per-day">Máximo de Agendamentos por Dia</Label>
                      <Input
                        id="max-per-day"
                        type="number"
                        placeholder="10"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => router.push("/appointments")}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Agenda</Button>
        </div>
      </div>
    </div>
  )
} 