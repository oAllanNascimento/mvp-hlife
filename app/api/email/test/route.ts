import { simulateEmailSend } from '@/lib/email/email-service';
import { NextResponse } from 'next/server';

/**
 * Rota de API para testar o envio de emails
 * GET /api/email/test?type=confirmation|cancellation
 */
export async function GET(request: Request) {
  try {
    // Obtém o tipo de email a ser enviado dos parâmetros de consulta
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'confirmation' | 'cancellation';
    
    // Valida o tipo de email
    if (!type || (type !== 'confirmation' && type !== 'cancellation')) {
      return NextResponse.json(
        { error: 'Tipo de email inválido. Use "confirmation" ou "cancellation".' },
        { status: 400 }
      );
    }
    
    // Envia o email de teste
    const result = await simulateEmailSend(type);
    
    // Verifica se o envio foi bem-sucedido
    if (!result.success) {
      console.error('Erro ao enviar email de teste:', result.error);
      return NextResponse.json(
        { error: 'Falha ao enviar email de teste', details: result.error },
        { status: 500 }
      );
    }
    
    // Retorna sucesso
    return NextResponse.json({
      success: true,
      message: `Email de ${type === 'confirmation' ? 'confirmação' : 'cancelamento'} enviado com sucesso`,
      emailId: result.data?.id
    });
  } catch (error) {
    console.error('Erro ao processar solicitação de teste de email:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar solicitação', details: error },
      { status: 500 }
    );
  }
} 