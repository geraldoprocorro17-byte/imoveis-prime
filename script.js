alert("JavaScript funcionando!");
// Substitua pelo WhatsApp real do corretor.
// Exemplo: 5512999999999
const telefone = "5512999999999";

const imoveis = [
  {
    titulo: "Casa moderna com 3 quartos",
    cidade: "Taubaté - SP",
    tipo: "casa",
    descricao: "3 quartos, 2 banheiros e garagem.",
    preco: 350000,
    foto: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85"
  },
  {
    titulo: "Terreno residencial",
    cidade: "Tremembé - SP",
    tipo: "terreno",
    descricao: "Terreno de 250 m² para construir.",
    preco: 120000,
    foto: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85"
  },
  {
    titulo: "Fazenda com área verde",
    cidade: "Interior de São Paulo",
    tipo: "fazenda",
    descricao: "Ampla propriedade rural e natureza.",
    preco: 950000,
    foto: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=85"
  }
];

const lista = document.getElementById("lista-imoveis");
const pesquisa = document.getElementById("pesquisa");
const tipo = document.getElementById("tipo");
const semResultados = document.getElementById("sem-resultados");

function criarLink(mensagem) {
  return `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
}

function mostrarImoveis() {
  const busca = pesquisa.value.toLocaleLowerCase("pt-BR").trim();
  const filtro = tipo.value;

  const filtrados = imoveis.filter(imovel => {
    const texto = `${imovel.titulo} ${imovel.cidade} ${imovel.descricao}`
      .toLocaleLowerCase("pt-BR");

    return texto.includes(busca) &&
      (filtro === "todos" || imovel.tipo === filtro);
  });

  lista.innerHTML = "";

  filtrados.forEach(imovel => {
    const card = document.createElement("article");
    card.className = "card";

    const mensagem = `Olá! Tenho interesse no imóvel: ${imovel.titulo}.`;

    card.innerHTML = `
      <div class="card-imagem">
        <img src="${imovel.foto}" alt="${imovel.titulo}" loading="lazy">
        <span class="etiqueta">À VENDA</span>
      </div>
      <div class="card-conteudo">
        <p class="local">📍 ${imovel.cidade}</p>
        <h3>${imovel.titulo}</h3>
        <p class="descricao">${imovel.descricao}</p>
        <div class="preco">
          ${imovel.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0
          })}
        </div>
        <a class="card-botao" href="${criarLink(mensagem)}"
           target="_blank" rel="noopener noreferrer">
          Tenho interesse →
        </a>
      </div>
    `;

    lista.appendChild(card);
  });

  semResultados.hidden = filtrados.length > 0;
}

pesquisa.addEventListener("input", mostrarImoveis);
tipo.addEventListener("change", mostrarImoveis);

document.getElementById("whatsapp-contato").href =
  criarLink("Olá! Gostaria de conhecer os imóveis disponíveis.");

mostrarImoveis();
