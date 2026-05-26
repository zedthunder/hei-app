import React, { useState, useEffect } from 'react';
// 1. IMPORTANDO OS ÍCONES DA BIBLIOTECA
import { 
  Hand,   // Quero
  Smile,         // Estou / Feliz
  MapPin,        // Vamos
  XCircle,       // Não
  CheckCircle,   // Sim
  ShowerHead,    // Banheiro / Banho
  CupSoda,       // Água / Suco
  Cookie,        // Biscoito
  Tablet,        // Tablet
  Tv,            // Desenho
  Dices,         // Brinquedo
  Frown,         // Triste
  Utensils,      // Com Fome
  Activity,      // Com Dor
  Moon,          // Cansado / Dormir
  Home,          // Casa
  GraduationCap, // Escola
  Compass        // Passear
} from 'lucide-react';

// ==========================================
// COMPONENTE FILHO: BOTÃO COM ÍCONE E TEXTO
// ==========================================
// Agora ele recebe a prop 'icone' além de texto e cor
function BotaoCAA({ texto, cor, icone: IconeComponente, acao }) {
  return (
    <button
      onClick={acao}
      style={{
        display: 'flex',
        flexDirection: 'column', // Empilha o ícone em cima e o texto embaixo
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',             // Espaço entre o ícone e o texto
        padding: '15px',
        fontSize: '20px',
        fontWeight: 'bold',
        backgroundColor: cor,
        color: cor === '#FFEB3B' ? 'black' : 'white',
        border: 'none',
        borderRadius: '20px',    // Bordas um pouco mais arredondadas e amigáveis
        boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        width: '100%',
        height: '130px'          // Aumentamos um pouquinho a altura para caber o ícone + texto
      }}
    >
      {/* 2. RENDERIZANDO O ÍCONE DINAMICAMENTE */}
      {IconeComponente && <IconeComponente size={40} strokeWidth={2.5} />}
      
      <span>{texto}</span>
    </button>
  );
}

// ==========================================
// COMPONENTE PAI (App)
// ==========================================
export default function App() {
  const [frase, setFrase] = useState("");
  const [telaAtual, setTelaAtual] = useState("home");

  // Timer de inatividade (15 segundos)
  useEffect(() => {
    if (frase === "") return;
    const cronometro = setTimeout(() => {
      setFrase("");
      setTelaAtual("home");
    }, 15000); 
    return () => clearTimeout(cronometro);
  }, [frase]);

  // ==========================================
  // NOSSO BANCO DE DADOS ATUALIZADO COM ÍCONES
  // ==========================================
  const dadosTelas = {
    home: [
      { id: 1, texto: "Quero...", cor: "#4CAF50", tipo: "navegar", destino: "quero", icone: Hand},
      { id: 2, texto: "Estou...", cor: "#2196F3", tipo: "navegar", destino: "estou", icone: Smile },
      { id: 3, texto: "Vamos...", cor: "#9C27B0", tipo: "navegar", destino: "vamos", icone: MapPin },
      { id: 4, texto: "Não", cor: "#F44336", tipo: "falar", icone: XCircle },
      { id: 5, texto: "Sim", cor: "#00E676", tipo: "falar", icone: CheckCircle },
      { id: 6, texto: "Banheiro", cor: "#FF9800", tipo: "falar", icone: ShowerHead }
    ],
    quero: [
      { id: 201, texto: "Água", cor: "#FFEB3B", tipo: "falar", icone: CupSoda },
      { id: 202, texto: "Suco", cor: "#FFEB3B", tipo: "falar", icone: CupSoda },
      { id: 203, texto: "Biscoito", cor: "#FFEB3B", tipo: "falar", icone: Cookie },
      { id: 204, texto: "Tablet", cor: "#E91E63", tipo: "falar", icone: Tablet },
      { id: 205, texto: "Desenho", cor: "#E91E63", tipo: "falar", icone: Tv },
      { id: 206, texto: "Brinquedo", cor: "#E91E63", tipo: "falar", icone: Dices }
    ],
    estou: [
      { id: 301, texto: "Feliz", cor: "#2196F3", tipo: "falar", icone: Smile },
      { id: 302, texto: "Triste", cor: "#2196F3", tipo: "falar", icone: Frown },
      { id: 303, texto: "Com Fome", cor: "#FF9800", tipo: "falar", icone: Utensils },
      { id: 304, texto: "Com Dor", cor: "#F44336", tipo: "falar", icone: Activity },
      { id: 305, texto: "Cansado", cor: "#9E9E9E", tipo: "falar", icone: Moon }
    ],
    vamos: [
      { id: 401, texto: "Casa", cor: "#9C27B0", tipo: "falar", icone: Home },
      { id: 402, texto: "Escola", cor: "#9C27B0", tipo: "falar", icone: GraduationCap },
      { id: 403, texto: "Passear", cor: "#9C27B0", tipo: "falar", icone: Compass },
      { id: 404, texto: "Banho", cor: "#00BCD4", tipo: "falar", icone: ShowerHead },
      { id: 405, texto: "Dormir", cor: "#3F51B5", tipo: "falar", icone: Moon }
    ]
  };

  const lidarComClique = (botao) => {
    if (botao.tipo === "navegar") {
      const textoLimpo = botao.texto.replace("...", "");
      falarTexto(textoLimpo);
      const novaFrase = frase ? `${frase} ${textoLimpo}` : textoLimpo;
      setFrase(novaFrase);
      setTelaAtual(botao.destino);
    } else {
      const novaFrase = frase ? `${frase} ${botao.texto}` : botao.texto;
      setFrase(novaFrase);
      falarTexto(botao.texto);
      setTelaAtual("home");
    }
  };

  const falarTexto = (textoParaFalar) => {
    if (!textoParaFalar) return;
    const mensagem = new SpeechSynthesisUtterance(textoParaFalar);
    mensagem.lang = 'pt-BR';
    window.speechSynthesis.speak(mensagem);
  };

  const falarFraseCompleta = () => {
    falarTexto(frase);
    setFrase("");
    setTelaAtual("home");
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* BARRA DE FRASE */}
      <div style={{ 
        border: '3px dashed #b3b3b3', padding: '15px', borderRadius: '15px', 
        minHeight: '50px', fontSize: '26px', backgroundColor: '#fcfcfc',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px'
      }}>
        <span>{frase || "Toque nos botões..."}</span>
        {frase && (
          <button onClick={falarFraseCompleta} style={{ padding: '10px 15px', fontSize: '16px', backgroundColor: '#00E676', color: 'black', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            🔊 Falar Tudo
          </button>
        )}
      </div>

      {/* BOTÃO VOLTAR */}
      {telaAtual !== "home" && (
        <button 
          onClick={() => setTelaAtual("home")}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#607D8B', color: 'white', border: 'none', borderRadius: '8px', marginBottom: '15px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          ⬅️ Voltar para o Início
        </button>
      )}

      {/* GRADE DE BOTÕES (CSS GRID) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
        {dadosTelas[telaAtual].map((botao) => (
          <BotaoCAA 
            key={botao.id} 
            texto={botao.texto} 
            cor={botao.cor} 
            icone={botao.icone} // Passa o componente de ícone como Prop
            acao={() => lidarComClique(botao)} 
          />
        ))}
      </div>

    </div>
  );
}