import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    // Ativamos o plugin do PWA e passamos as configurações do App
    VitePWA({
      registerType: 'autoUpdate', // Atualiza o app automaticamente quando você mudar o código
      manifest: {
        name: 'Comunicação Alternativa CAA',
        short_name: 'CAA Voz',
        description: 'Aplicativo de Comunicação Alternativa e Aumentativa',
        theme_color: '#4CAF50', // Cor da barra de status do sistema
        background_color: '#ffffff', // Cor de fundo enquanto o app carrega
        display: 'standalone', // O SEGREDO: Faz o app rodar em TELA CHEIA, sem navegador!
        orientation: 'portrait', // Trava o app em modo retrato (em pé) para manter o planejamento motor
        icons: [
          // Ícones obrigatórios para o sistema saber o que mostrar na tela inicial
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});