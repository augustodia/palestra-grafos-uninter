import { ArestaComPeso } from "./arestaComPeso";
import { Grafo } from "./grafo";
// 1 - Implementa de um grafo não direcionado com pesos

// Extende a classe Grafo anterior, pois a estrutura de vértices e arestas é a mesma
export class GrafoComPeso<V> extends Grafo<V> {
  arestas: Array<Array<ArestaComPeso>> = []; // Redeclara o atributo arestas por conta do tipo

  constructor(vertices: Array<V> = []) {
    super(vertices); // Chama o construtor da classe pai
    this.arestas = vertices.map(() => []);
  }

  // Adiciona uma nova aresta ao grafo com pesos
  adicionarArestaUsandoVerticesComPeso(de: V, para: V, peso: number): void {
    const i = this.vertices.indexOf(de);
    const j = this.vertices.indexOf(para);

    if (i === -1 || j === -1) {
      throw new Error("Vértice não encontrado");
    }

    this.adicionarArestaUsandoIndicesComPesos(i, j, peso);
  }

  // Adiciona uma nova aresta ao grafo com pesos
  protected adicionarArestaUsandoIndicesComPesos(
    indexDe: number,
    indexPara: number,
    peso: number
  ): void {
    // Adiciona a nova aresta ao vetor de arestas. Usa o método da classe pai
    this.adicionarNovaAresta(
      new ArestaComPeso({ de: indexDe, para: indexPara, peso })
    );
  }

  // Obtém o peso de uma aresta entre dois vértices
  obterPesoDaAresta(de: V, para: V): number {
    const i = this.vertices.indexOf(de);
    const j = this.vertices.indexOf(para);

    if (i === -1 || j === -1) {
      throw new Error("Vértice não encontrado");
    }

    const aresta = this.arestas[i].find((a) => a.para === j);

    if (!aresta) {
      throw new Error("Aresta não encontrada");
    }

    return aresta.peso;
  }

  // Obtém os vizinhos de um vértice com os pesos
  obterVizinhosDoVerticeComPesos(
    vertice: V
  ): Array<{ vertice: V; peso: number }> {
    const index = this.vertices.indexOf(vertice);

    if (index === -1) {
      throw new Error("Vértice não encontrado");
    }

    return this.obterVizinhosDoVerticePorIndiceComPesos(index);
  }

  // Obtém os vizinhos de um vértice com os pesos
  obterVizinhosDoVerticePorIndiceComPesos(
    index: number
  ): Array<{ vertice: V; peso: number }> {
    // Retorna uma cópia das arestas do vértice, convertendo para o tipo desejado
    return this.arestas[index].map((aresta) => {
      return {
        vertice: this.obterVerticePorIndice(aresta.para),
        peso: aresta.peso,
      };
    });
  }

  // Algoritmo de Dijkstra para encontrar o menor caminho entre dois vértices
  irAte(inicio: V, fim: V): Array<V> {
    const inicioIndex = this.vertices.indexOf(inicio); // Obtém o índice do vértice de início
    const fimIndex = this.vertices.indexOf(fim); // Obtém o índice do vértice de fim

    if (inicioIndex === -1 || fimIndex === -1) {
      // Verifica se os vértices existem
      throw new Error("Vértice não encontrado");
    }

    // Inicializa um vetor com as distâncias dos vértices ao vértice de início
    const distancias = this.vertices.map(() => Infinity);
    // A distância do vértice de início a ele mesmo é 0
    distancias[inicioIndex] = 0;

    // Inicializa um vetor para rastrear os vértices anteriores
    const anteriores = this.vertices.map(() => -1);

    // Inicializa um conjunto com os vértices visitados
    const visitados = new Set<number>();

    // Enquanto houver vértices não visitados
    while (visitados.size < this.vertices.length) {
      // Obtém o vértice não visitado com a menor distância
      const verticeAtual = this.obterVerticeComMenorDistancia(
        distancias,
        visitados
      );

      // Adiciona o vértice atual ao conjunto de visitados
      visitados.add(verticeAtual);

      if (distancias[verticeAtual] === Infinity) {
        break;
      }

      // Pega os vizinhos do vértice atual com os pesos
      const vizinhos =
        this.obterVizinhosDoVerticePorIndiceComPesos(verticeAtual);

      for (const vizinho of vizinhos) {
        const indiceVizinho = this.vertices.indexOf(vizinho.vertice);
        // Calcula a distância do vértice de início ao vizinho
        const distancia = distancias[verticeAtual] + vizinho.peso;

        // Se a distância for menor que a distância atual, atualiza a distância e o vértice anterior
        if (distancia < distancias[indiceVizinho]) {
          distancias[indiceVizinho] = distancia;
          anteriores[indiceVizinho] = verticeAtual;
        }
      }
    }

    // Retorna o caminho do vértice de início ao vértice de fim
    return this.obterCaminho(anteriores, inicioIndex, fimIndex);
  }

  /**
   * Obtém o vértice não visitado com a menor distância
   * Por que apenas os vértices não visitados? Porque o algoritmo de Dijkstra
   * é guloso, ou seja, ele sempre escolhe o caminho que parece ser o melhor
   * naquele momento, sem se importar com o futuro.
   */
  obterVerticeComMenorDistancia(
    vertices: Array<number>,
    visitados: Set<number>
  ): number {
    let menor = Infinity; // Inicializa a menor distância com infinito
    let menorIndex = -1; // Inicializa o índice do vértice com a menor distância

    for (let i = 0; i < vertices.length; i++) {
      // Se a distância do vértice i for menor que a menor distância e o vértice não foi visitado
      if (vertices[i] < menor && !visitados.has(i)) {
        menor = vertices[i]; // Atualiza a menor distância
        menorIndex = i; // Atualiza o índice do vértice com a menor distância
      }
    }

    return menorIndex;
  }

  obterCaminho(
    anteriores: Array<number>,
    inicio: number,
    fim: number
  ): Array<V> {
    const caminho: Array<V> = []; // Inicializa o caminho
    let verticeAtual = fim; // Inicializa o vértice atual com o vértice de fim

    // Verifica se há um caminho válido até o vértice inicial
    if (anteriores[verticeAtual] === -1 && verticeAtual !== inicio) {
      throw new Error("Caminho não encontrado");
    }

    // Constrói o caminho do fim ao início
    while (verticeAtual !== -1) {
      caminho.unshift(this.vertices[verticeAtual]); // Adiciona o vértice atual ao início do caminho
      if (verticeAtual === inicio) break; // Se o vértice atual for o vértice de início, para
      verticeAtual = anteriores[verticeAtual]; // Atualiza o vértice atual para o anterior
    }

    return caminho;
  }

  toString(): string {
    return this.vertices
      .map((v, i) => {
        return `${v} -> [${this.obterVizinhosDoVerticePorIndiceComPesos(i)
          .map((vizinho) => `${vizinho.vertice}(${vizinho.peso})`)
          .join(", ")}]`;
      })
      .join("\n");
  }
}

// Exemplo de uso com estados brasileiros
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

const menorCaminho = grafo.irAte("Santa Catarina|SC", "Paraíba|PB");
console.log(`Menor caminho: ${menorCaminho.join(" -> ")}`);
