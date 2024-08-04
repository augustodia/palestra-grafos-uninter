import { Grafo } from "./grafo";

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

const grafo = new Grafo(estados.map((estado) => estado.nome));

// Fronteiras reais entre os estados
grafo.adicionarArestaUsandoVertices(
  "Rio Grande do Sul|RS",
  "Santa Catarina|SC"
);

grafo.adicionarArestaUsandoVertices("Santa Catarina|SC", "Paraná|PR");

grafo.adicionarArestaUsandoVertices("Paraná|PR", "São Paulo|SP");
grafo.adicionarArestaUsandoVertices("Paraná|PR", "Mato Grosso do Sul|MS");

grafo.adicionarArestaUsandoVertices("São Paulo|SP", "Mato Grosso do Sul|MS");
grafo.adicionarArestaUsandoVertices("São Paulo|SP", "Minas Gerais|MG");
grafo.adicionarArestaUsandoVertices("São Paulo|SP", "Rio de Janeiro|RJ");

grafo.adicionarArestaUsandoVertices("Rio de Janeiro|RJ", "Minas Gerais|MG");
grafo.adicionarArestaUsandoVertices("Rio de Janeiro|RJ", "Espírito Santo|ES");

grafo.adicionarArestaUsandoVertices("Espírito Santo|ES", "Minas Gerais|MG");

grafo.adicionarArestaUsandoVertices("Minas Gerais|MG", "Mato Grosso do Sul|MS");
grafo.adicionarArestaUsandoVertices("Minas Gerais|MG", "Goiás|GO");

grafo.adicionarArestaUsandoVertices("Goiás|GO", "Mato Grosso do Sul|MS");
grafo.adicionarArestaUsandoVertices("Goiás|GO", "Mato Grosso|MT");

grafo.adicionarArestaUsandoVertices("Mato Grosso|MT", "Mato Grosso do Sul|MS");
grafo.adicionarArestaUsandoVertices("Mato Grosso|MT", "Rondônia|RO");
grafo.adicionarArestaUsandoVertices("Mato Grosso|MT", "Amazonas|AM");

grafo.adicionarArestaUsandoVertices("Rondônia|RO", "Acre|AC");
grafo.adicionarArestaUsandoVertices("Rondônia|RO", "Amazonas|AM");

grafo.adicionarArestaUsandoVertices("Acre|AC", "Amazonas|AM");

grafo.adicionarArestaUsandoVertices("Amazonas|AM", "Roraima|RR");
grafo.adicionarArestaUsandoVertices("Amazonas|AM", "Pará|PA");

grafo.adicionarArestaUsandoVertices("Roraima|RR", "Pará|PA");

grafo.adicionarArestaUsandoVertices("Pará|PA", "Amapá|AP");
grafo.adicionarArestaUsandoVertices("Pará|PA", "Tocantins|TO");
grafo.adicionarArestaUsandoVertices("Pará|PA", "Maranhão|MA");
grafo.adicionarArestaUsandoVertices("Pará|PA", "Mato Grosso|MT");

grafo.adicionarArestaUsandoVertices("Tocantins|TO", "Maranhão|MA");
grafo.adicionarArestaUsandoVertices("Tocantins|TO", "Piauí|PI");
grafo.adicionarArestaUsandoVertices("Tocantins|TO", "Bahia|BA");
grafo.adicionarArestaUsandoVertices("Tocantins|TO", "Mato Grosso|MT");
grafo.adicionarArestaUsandoVertices("Tocantins|TO", "Goiás|GO");

grafo.adicionarArestaUsandoVertices("Maranhão|MA", "Piauí|PI");

grafo.adicionarArestaUsandoVertices("Piauí|PI", "Ceará|CE");
grafo.adicionarArestaUsandoVertices("Piauí|PI", "Bahia|BA");
grafo.adicionarArestaUsandoVertices("Piauí|PI", "Pernambuco|PE");

grafo.adicionarArestaUsandoVertices("Ceará|CE", "Rio Grande do Norte|RN");
grafo.adicionarArestaUsandoVertices("Ceará|CE", "Paraíba|PB");
grafo.adicionarArestaUsandoVertices("Ceará|CE", "Pernambuco|PE");

grafo.adicionarArestaUsandoVertices("Rio Grande do Norte|RN", "Paraíba|PB");

grafo.adicionarArestaUsandoVertices("Paraíba|PB", "Pernambuco|PE");

grafo.adicionarArestaUsandoVertices("Pernambuco|PE", "Alagoas|AL");
grafo.adicionarArestaUsandoVertices("Pernambuco|PE", "Bahia|BA");

grafo.adicionarArestaUsandoVertices("Alagoas|AL", "Sergipe|SE");
grafo.adicionarArestaUsandoVertices("Alagoas|AL", "Bahia|BA");

grafo.adicionarArestaUsandoVertices("Sergipe|SE", "Bahia|BA");

grafo.adicionarArestaUsandoVertices("Bahia|BA", "Espírito Santo|ES");
grafo.adicionarArestaUsandoVertices("Bahia|BA", "Minas Gerais|MG");
grafo.adicionarArestaUsandoVertices("Bahia|BA", "Goiás|GO");

console.log(grafo.toString());

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

function desenhaEtapa(
  vertice: string,
  visitados: string[],
  fila: string[],
  anteriores: Map<string, string>
) {
  desenhaGrafo();

  // Destaque o vértice atual
  const verticeAtual = estados.find((estado) => estado.nome === vertice);
  if (verticeAtual) {
    ctx.beginPath();
    ctx.arc(
      verticeAtual.x * canvas.width,
      verticeAtual.y * canvas.height,
      12,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "orange";
    ctx.fill();
  }

  // Destaque os vértices na fila
  fila.forEach((v) => {
    const estado = estados.find((estado) => estado.nome === v);
    if (estado) {
      ctx.beginPath();
      ctx.arc(
        estado.x * canvas.width,
        estado.y * canvas.height,
        12,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "yellow";
      ctx.fill();
    }
  });

  // Destaque os vértices visitados
  visitados.forEach((v) => {
    const estado = estados.find((estado) => estado.nome === v);
    if (estado) {
      ctx.beginPath();
      ctx.arc(
        estado.x * canvas.width,
        estado.y * canvas.height,
        12,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "green";
      ctx.fill();
    }
  });

  // Desenhe a fila e os anteriores no canto
  desenhaInformacoes(fila, anteriores);
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

function desenhaInformacoes(fila: string[], anteriores: Map<string, string>) {
  ctx.fillStyle = "black";
  ctx.font = "14px Arial";

  // Desenhe a fila
  ctx.fillText("Fila:", 10, 20);
  fila.forEach((v, index) => {
    ctx.fillText(`${index + 1}: ${v.split("|")[1]}`, 10, 40 + index * 20);
  });

  // Desenhe os anteriores
  ctx.fillText("Anteriores:", 100, 20);
  let i = 0;
  anteriores.forEach((valor, chave) => {
    ctx.fillText(
      `${chave.split("|")[1]} <- ${valor.split("|")[1]}`,
      100,
      40 + i * 20
    );
    i++;
  });
}

async function irAteComAnimacao(origem: string, destino: string) {
  const fila = [origem];
  const visitados = new Set();
  const anteriores = new Map();

  while (fila.length > 0) {
    let vertice = fila.shift() as string;
    visitados.add(vertice);

    // Desenhe a etapa atual
    desenhaEtapa(vertice, Array.from(visitados) as string[], fila, anteriores);

    // Adicione um atraso para a animação
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (vertice === destino) {
      const caminho = [];
      let temp = vertice;
      while (temp !== origem) {
        caminho.unshift(temp);
        temp = anteriores.get(temp);
      }
      caminho.unshift(origem);

      // desenhaGrafo();
      desenhaCaminhoFinal(caminho);

      return caminho;
    }

    grafo.obterVizinhosDoVertice(vertice).forEach((vizinho) => {
      if (!visitados.has(vizinho) && !fila.includes(vizinho)) {
        anteriores.set(vizinho, vertice);
        fila.push(vizinho);
      }
    });
  }

  return [];
}

const caminho = grafo.irAte("Rio Grande do Sul|RS", "Paraíba|PB");

console.log(caminho);

irAteComAnimacao("Rio Grande do Sul|RS", "Paraíba|PB");
