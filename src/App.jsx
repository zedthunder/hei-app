import React, { useState, useEffect } from 'react';
import { 
  Hand,          // Quero
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
  
  // NOVOS ÍCONES PARA OS NOVOS LUGARES:
  Heart,         // Casa da Vovó / Vovô (Representando carinho/avós)
  Church,        // Igreja
  ShoppingCart,  // Mercado
  Waves,         // Lago
  Trees          // Parquinho
} from 'lucide-react';

function BotaoCAA({ texto, cor, icone: IconeComponente, acao }) {
  return (
    <button
      onClick={acao}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px',
        fontSize: '18px', // Diminuímos um pouquinho a fonte para caber em 3 colunas
        fontWeight: 'bold',
        backgroundColor: cor,
        color: cor === '#FFEB3B' ? 'black' : 'white',
        border: 'none',
        borderRadius: '20px',
        boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        width: '100%',
        height: '120px' 
      }}
    >
      {IconeComponente && <IconeComponente size={38} strokeWidth={2.5} />}
      <span>{texto}</span>
    </button>
  );
}

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

  const dadosTelas = {
    home: [
      { id: 1, texto: "Quero...", cor: "#4CAF50", tipo: "navegar", destino: "quero", icone: Hand },
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
    // ATUALIZADO: Nova lista expandida do "Vamos" com os novos lugares do Hei
    vamos: [
      { id: 401, texto: "Casa da Vovó", cor: "#9C27B0", tipo: "falar", icone: Heart },
      { id: 402, texto: "Casa do Vovô", cor: "#9C27B0", tipo: "falar", icone: Heart },
      { id: 403, texto: "Igreja", cor: "#9C27B0", tipo: "falar", icone: Church },
      { id: 404, texto: "Mercado", cor: "#9C27B0", tipo: "falar", icone: ShoppingCart },
      { id: 405, texto: "Lago", cor: "#9C27B0", tipo: "falar", icone: Waves },
      { id: 406, texto: "Parquinho", cor: "#9C27B0", tipo: "falar", icone: Trees },
      { id: 407, texto: "Escola", cor: "#9C27B0", tipo: "falar", icone: GraduationCap },
      { id: 408, texto: "Banho", cor: "#00BCD4", tipo: "falar", icone: ShowerHead },
      { id: 409, texto: "Dormir", cor: "#3F51B5", tipo: "falar", icone: Moon }
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
    <div style={{ padding: '15px', fontFamily: 'sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      
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

      {/* GRADE DE BOTÕES DINÂMICA (MUDADA PARA 3 COLUNAS) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', // <--- A MÁGICA: Agora divide o espaço em 3 colunas iguais
        gap: '12px' 
      }}>
        {dadosTelas[telaAtual].map((botao) => (
          <BotaoCAA 
            key={botao.id} 
            texto={botao.texto} 
            cor={botao.cor} 
            icone={botao.icone} 
            acao={() => lidarComClique(botao)} 
          />
        ))}
      </div>

    </div>
  );
}