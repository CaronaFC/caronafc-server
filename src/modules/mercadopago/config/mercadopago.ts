import { config } from 'dotenv';
import { MercadoPagoConfig } from 'mercadopago';
config(); // Carrega as variáveis de ambiente do arquivo .env

export const MercadoPagoProvider = {
  provide: 'MERCADO_PAGO', // Token de injeção
  useFactory: () => {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error('Access Token do Mercado Pago não está definido.');
    }

    return new MercadoPagoConfig({
      accessToken,
    });
  },
};
