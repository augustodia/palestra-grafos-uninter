import { GrafoComPeso } from "./grafoComPeso";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = canvas!.clientWidth;
canvas.height = canvas!.clientHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Redesenhe o grafo
  desenhaGrafo();
});
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const estados = [
  { nome: "Rio Grande do Sul|RS", x: 0.4, y: 0.9 },
  { nome: "Santa Catarina|SC", x: 0.43, y: 0.8 },
  { nome: "Paraná|PR", x: 0.42, y: 0.7 },
  { nome: "São Paulo|SP", x: 0.5, y: 0.64 },
  { nome: "Rio de Janeiro|RJ", x: 0.6, y: 0.6 },
  { nome: "Espírito Santo|ES", x: 0.7, y: 0.5 },
  { nome: "Goiás|GO", x: 0.5, y: 0.45 },
  { nome: "Minas Gerais|MG", x: 0.6, y: 0.48 },
  { nome: "Mato Grosso|MT", x: 0.35, y: 0.4 },
  { nome: "Mato Grosso do Sul|MS", x: 0.35, y: 0.6 },
  { nome: "Rondônia|RO", x: 0.25, y: 0.38 },
  { nome: "Acre|AC", x: 0.2, y: 0.35 },
  { nome: "Amazonas|AM", x: 0.3, y: 0.2 },
  { nome: "Roraima|RR", x: 0.35, y: 0.1 },
  { nome: "Pará|PA", x: 0.45, y: 0.2 },
  { nome: "Amapá|AP", x: 0.5, y: 0.1 },
  { nome: "Tocantins|TO", x: 0.5, y: 0.3 },
  { nome: "Maranhão|MA", x: 0.6, y: 0.2 },
  { nome: "Piauí|PI", x: 0.65, y: 0.25 },
  { nome: "Ceará|CE", x: 0.7, y: 0.2 },
  { nome: "Rio Grande do Norte|RN", x: 0.75, y: 0.22 },
  { nome: "Paraíba|PB", x: 0.75, y: 0.25 },
  { nome: "Pernambuco|PE", x: 0.74, y: 0.3 },
  { nome: "Alagoas|AL", x: 0.77, y: 0.35 },
  { nome: "Sergipe|SE", x: 0.73, y: 0.4 },
  { nome: "Bahia|BA", x: 0.6, y: 0.37 },
];

const grafo = new GrafoComPeso(estados.map((estado) => estado.nome));

// Fronteiras reais entre os estados
grafo.adicionarArestaUsandoVerticesComPeso(
  "Rio Grande do Sul|RS",
  "Santa Catarina|SC",
  1
);

grafo.adicionarArestaUsandoVerticesComPeso("Santa Catarina|SC", "Paraná|PR", 1);

grafo.adicionarArestaUsandoVerticesComPeso(
  "Paraná|PR",
  "Mato Grosso do Sul|MS",
  5
);
grafo.adicionarArestaUsandoVerticesComPeso("Paraná|PR", "São Paulo|SP", 2);

grafo.adicionarArestaUsandoVerticesComPeso(
  "São Paulo|SP",
  "Mato Grosso do Sul|MS",
  3
);
grafo.adicionarArestaUsandoVerticesComPeso(
  "São Paulo|SP",
  "Minas Gerais|MG",
  3
);
grafo.adicionarArestaUsandoVerticesComPeso(
  "São Paulo|SP",
  "Rio de Janeiro|RJ",
  1
);

grafo.adicionarArestaUsandoVerticesComPeso(
  "Rio de Janeiro|RJ",
  "Minas Gerais|MG",
  1
);
grafo.adicionarArestaUsandoVerticesComPeso(
  "Rio de Janeiro|RJ",
  "Espírito Santo|ES",
  1
);

grafo.adicionarArestaUsandoVerticesComPeso(
  "Espírito Santo|ES",
  "Minas Gerais|MG",
  1
);

grafo.adicionarArestaUsandoVerticesComPeso(
  "Minas Gerais|MG",
  "Mato Grosso do Sul|MS",
  1
);
grafo.adicionarArestaUsandoVerticesComPeso("Minas Gerais|MG", "Goiás|GO", 1);

grafo.adicionarArestaUsandoVerticesComPeso(
  "Goiás|GO",
  "Mato Grosso do Sul|MS",
  1
);
grafo.adicionarArestaUsandoVerticesComPeso("Goiás|GO", "Mato Grosso|MT", 1);

grafo.adicionarArestaUsandoVerticesComPeso(
  "Mato Grosso|MT",
  "Mato Grosso do Sul|MS",
  1
);
grafo.adicionarArestaUsandoVerticesComPeso("Mato Grosso|MT", "Rondônia|RO", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Mato Grosso|MT", "Pará|PA", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Mato Grosso|MT", "Amazonas|AM", 1);

grafo.adicionarArestaUsandoVerticesComPeso("Rondônia|RO", "Acre|AC", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Rondônia|RO", "Amazonas|AM", 1);

grafo.adicionarArestaUsandoVerticesComPeso("Acre|AC", "Amazonas|AM", 1);

grafo.adicionarArestaUsandoVerticesComPeso("Amazonas|AM", "Roraima|RR", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Amazonas|AM", "Pará|PA", 1);

grafo.adicionarArestaUsandoVerticesComPeso("Roraima|RR", "Pará|PA", 1);

grafo.adicionarArestaUsandoVerticesComPeso("Pará|PA", "Amapá|AP", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Pará|PA", "Tocantins|TO", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Pará|PA", "Maranhão|MA", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Pará|PA", "Mato Grosso|MT", 1);

grafo.adicionarArestaUsandoVerticesComPeso("Tocantins|TO", "Maranhão|MA", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Tocantins|TO", "Piauí|PI", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Tocantins|TO", "Bahia|BA", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Tocantins|TO", "Mato Grosso|MT", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Tocantins|TO", "Goiás|GO", 1);

grafo.adicionarArestaUsandoVerticesComPeso("Maranhão|MA", "Piauí|PI", 1);

grafo.adicionarArestaUsandoVerticesComPeso("Piauí|PI", "Ceará|CE", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Piauí|PI", "Bahia|BA", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Piauí|PI", "Pernambuco|PE", 1);

grafo.adicionarArestaUsandoVerticesComPeso(
  "Ceará|CE",
  "Rio Grande do Norte|RN",
  1
);
grafo.adicionarArestaUsandoVerticesComPeso("Ceará|CE", "Paraíba|PB", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Ceará|CE", "Pernambuco|PE", 1);

grafo.adicionarArestaUsandoVerticesComPeso(
  "Rio Grande do Norte|RN",
  "Paraíba|PB",
  1
);

grafo.adicionarArestaUsandoVerticesComPeso("Paraíba|PB", "Pernambuco|PE", 1);

grafo.adicionarArestaUsandoVerticesComPeso("Pernambuco|PE", "Alagoas|AL", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Pernambuco|PE", "Bahia|BA", 1);

grafo.adicionarArestaUsandoVerticesComPeso("Alagoas|AL", "Sergipe|SE", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Alagoas|AL", "Bahia|BA", 1);

grafo.adicionarArestaUsandoVerticesComPeso("Sergipe|SE", "Bahia|BA", 1);

grafo.adicionarArestaUsandoVerticesComPeso("Bahia|BA", "Espírito Santo|ES", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Bahia|BA", "Minas Gerais|MG", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Bahia|BA", "Goiás|GO", 1);

console.log(grafo.toString());

function desenhaEtapa(
  verticeAtual: string,
  visitados: Set<number>,
  fim = false
) {
  desenhaGrafo();
  const index = grafo.obterIndiceDoVertice(verticeAtual);
  const vertice = estados[index];
  const x = vertice.x * canvas.width;
  const y = vertice.y * canvas.height;

  // Desenhar o vértice atual em vermelho
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();

  // Desenhar os vértices visitados em verde
  visitados.forEach((index) => {
    const vertice = estados[index];
    const x = vertice.x * canvas.width;
    const y = vertice.y * canvas.height;

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
  });

  desenhaPesos();
  // Exibir informações adicionais
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText(`Vértice Atual: ${verticeAtual}`, 20, canvas.height - 40);
  ctx.fillText(`Visitados: ${visitados.size}`, 20, canvas.height - 20);

  if (fim) {
    return;
  }

  // Desenhar arestas para os vizinhos
  const vizinhos = grafo.obterVizinhosDoVerticePorIndiceComPesos(index);
  for (const vizinho of vizinhos) {
    const vizinhoIndex = grafo.obterIndiceDoVertice(vizinho.vertice);
    const vizinhoVertice = estados[vizinhoIndex];
    const vizinhoX = vizinhoVertice.x * canvas.width;
    const vizinhoY = vizinhoVertice.y * canvas.height;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(vizinhoX, vizinhoY);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.closePath();
  }
}

function desenhaCaminhoFinal(caminho: string[]) {
  for (let i = 0; i < caminho.length - 1; i++) {
    const origem = estados.find((estado) => estado.nome === caminho[i]);
    const destino = estados.find((estado) => estado.nome === caminho[i + 1]);

    if (origem && destino) {
      const origemX = origem.x * canvas.width;
      const origemY = origem.y * canvas.height;
      const destinoX = destino.x * canvas.width;
      const destinoY = destino.y * canvas.height;

      ctx.beginPath();
      ctx.moveTo(origemX, origemY);
      ctx.lineTo(destinoX, destinoY);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }
}

function desenhaGrafo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhe todas as arestas
  for (let i = 0; i < grafo.obterNumeroDeVertices(); i++) {
    const vertice = estados[i];
    const x = vertice.x * canvas.width;
    const y = vertice.y * canvas.height;

    const vizinhos = grafo.obterVizinhosDoVerticePorIndice(i);
    vizinhos.forEach((vizinho) => {
      const vizinhoVertice = estados[grafo.obterIndiceDoVertice(vizinho)];
      const vizinhoX = vizinhoVertice.x * canvas.width;
      const vizinhoY = vizinhoVertice.y * canvas.height;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(vizinhoX, vizinhoY);
      ctx.strokeStyle = "#CCCCCC";
      ctx.stroke();
    });
  }

  // Desenhe todos os vértices
  for (let i = 0; i < grafo.obterNumeroDeVertices(); i++) {
    const vertice = estados[i];
    const x = vertice.x * canvas.width;
    const y = vertice.y * canvas.height;

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    const sigla = grafo.obterVerticePorIndice(i).split("|")[1];
    ctx.fillText(sigla, x + 20, y);
  }
}

function irAteComAnimacao(origem: string, destino: string) {
  const inicioIndex = grafo.obterIndiceDoVertice(origem);
  const fimIndex = grafo.obterIndiceDoVertice(destino);

  if (inicioIndex === -1 || fimIndex === -1) {
    console.error("Estado não encontrado");
    return;
  }

  const distancias = grafo.vertices.map(() => Infinity);
  distancias[inicioIndex] = 0;

  const anteriores = grafo.vertices.map(() => -1);
  const visitados = new Set<number>();

  function processaProximaEtapa() {
    if (visitados.size >= grafo.obterNumeroDeVertices()) {
      desenhaEtapa(grafo.obterVerticePorIndice(fimIndex), visitados, true);
      desenhaCaminhoFinal(
        grafo.obterCaminho(anteriores, inicioIndex, fimIndex)
      );

      return;
    }

    const verticeAtualIndex = grafo.obterVerticeComMenorDistancia(
      distancias,
      visitados
    );

    if (distancias[verticeAtualIndex] === Infinity) {
      return;
    }

    const verticeAtual = grafo.obterVerticePorIndice(verticeAtualIndex);
    visitados.add(verticeAtualIndex);
    desenhaEtapa(verticeAtual, visitados);

    const vizinhos =
      grafo.obterVizinhosDoVerticePorIndiceComPesos(verticeAtualIndex);

    for (const vizinho of vizinhos) {
      const vizinhoIndex = grafo.obterIndiceDoVertice(vizinho.vertice);
      const novaDistancia = distancias[verticeAtualIndex] + vizinho.peso;

      if (novaDistancia < distancias[vizinhoIndex]) {
        distancias[vizinhoIndex] = novaDistancia;
        anteriores[vizinhoIndex] = verticeAtualIndex;
      }
    }

    setTimeout(processaProximaEtapa, 300);
  }

  processaProximaEtapa();
}

// Função para desenhar os pesos
function desenhaPesos() {
  for (let i = 0; i < grafo.obterNumeroDeVertices(); i++) {
    const vertice = estados[i];
    const x = vertice.x * canvas.width;
    const y = vertice.y * canvas.height;

    const vizinhos = grafo.obterVizinhosDoVerticePorIndice(i);
    vizinhos.forEach((vizinho) => {
      const vizinhoVertice = estados[grafo.obterIndiceDoVertice(vizinho)];
      const vizinhoX = vizinhoVertice.x * canvas.width;
      const vizinhoY = vizinhoVertice.y * canvas.height;

      const meioX = (x + vizinhoX) / 2;
      const meioY = (y + vizinhoY) / 2;

      if (vertice.nome !== vizinho) {
        const peso = grafo.obterPesoDaAresta(vertice.nome, vizinho);
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillText(peso.toString(), meioX, meioY);
      }
    });
  }
}

// Exemplo de uso da função com animação
irAteComAnimacao("Rio Grande do Sul|RS", "Goiás|GO");
