import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface CancellationEmailProps {
  name: string;
  date: string;
  time: string;
  serviceName: string;
  professionalName: string;
  rebookingLink: string;
}

export const CancellationEmail = ({
  name,
  date,
  time,
  serviceName,
  professionalName,
  rebookingLink,
}: CancellationEmailProps) => {
  const previewText = `Cancelamento do seu agendamento ${serviceName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Agendamento Cancelado</Heading>
          
          <Text style={paragraph}>Olá {name},</Text>
          <Text style={paragraph}>
            Seu agendamento foi cancelado conforme solicitado. Abaixo estão os detalhes do agendamento cancelado:
          </Text>
          
          <Text style={paragraph}>
            <strong>Serviço:</strong> {serviceName}<br />
            <strong>Data:</strong> {date}<br />
            <strong>Horário:</strong> {time}<br />
            <strong>Profissional:</strong> {professionalName}
          </Text>
          
          <Text style={paragraph}>
            Se deseja reagendar, por favor acesse o link abaixo:
          </Text>
          
          <Link href={rebookingLink} style={button}>
            Reagendar
          </Link>
          
          <Text style={paragraph}>
            Agradecemos a preferência!<br />
            Equipe HLife
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Estilos
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0',
  width: '580px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
};

const paragraph = {
  margin: '15px 0',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#3c4043',
};

const button = {
  display: 'block',
  width: '200px',
  backgroundColor: '#2563eb',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  textAlign: 'center' as const,
  padding: '12px 0',
  marginTop: '25px',
  marginBottom: '25px',
  textDecoration: 'none',
};

export default CancellationEmail; 