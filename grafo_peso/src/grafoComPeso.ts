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

  // Adiciona uma nova aresta ao grafo com pesos
  adicionarArestaUsandoVerticesComPeso(de: V, para: V, peso: number): void {
    const i = this.vertices.indexOf(de);
    const j = this.vertices.indexOf(para);

    if (i === -1 || j === -1) {
      throw new Error("Vértice não encontrado");
    }

    this.adicionarArestaUsandoIndicesComPesos(i, j, peso);
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
  obterVizinhosDoVerticePorIndiceComPesos(
    index: number
  ): Array<{ vertice: V; peso: number }> {
    // Retorna uma cópia das arestas do vértice, convertendo para o tipo desejado
    return (
      this.arestas[index]

        // .sort((a, b) => a.para - b.para) // Ordena as arestas por ordem crescente.
        .map((aresta) => {
          return {
            vertice: this.obterVerticePorIndice(aresta.para),
            peso: aresta.peso,
          };
        })
    );
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

  // Algoritmo de Dijkstra para encontrar o menor caminho entre dois vértices
  irAte(inicio: V, fim: V): Array<V> {
    const inicioIndex = this.vertices.indexOf(inicio); // Obtém o índice do vértice de início
    const fimIndex = this.vertices.indexOf(fim); // Obtém o índice do vértice de fim

    if (inicioIndex === -1 || fimIndex === -1) {
      // Verifica se os vértices existem
      throw new Error("Vértice não encontrado");
    }

    // Inicializa um vetor com as distâncias dos vértices ao vértice de início
    const verticesPercorridos = this.vertices.map(() => Infinity);
    // A distância do vértice de início a ele mesmo é 0
    verticesPercorridos[inicioIndex] = 0;

    // Inicializa um conjunto com os vértices visitados
    const visitados = new Set<number>();

    // Enquanto houver vértices não visitados
    while (visitados.size < this.vertices.length) {
      // Obtém o vértice não visitado com a menor distância
      const verticeAtual = this.obterVerticeComMenorDistancia(
        verticesPercorridos,
        visitados
      );

      // Adiciona o vértice atual ao conjunto de visitados
      visitados.add(verticeAtual);

      // Pega os vizinhos do vértice atual com os pesos
      const vizinhos =
        this.obterVizinhosDoVerticePorIndiceComPesos(verticeAtual);

      for (const vizinho of vizinhos) {
        const indiceVizinho = this.vertices.indexOf(vizinho.vertice);
        // Calcula a distância do vértice de início ao vizinho
        const distancia = verticesPercorridos[verticeAtual] + vizinho.peso;

        // Se a distância for menor que a distância atual, atualiza a distância, pois encontrou um caminho menor
        if (distancia < verticesPercorridos[indiceVizinho]) {
          verticesPercorridos[indiceVizinho] = distancia;
        }
      }
    }

    // Retorna o caminho do vértice de início ao vértice de fim
    return this.obterCaminho(verticesPercorridos, inicioIndex, fimIndex);
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

  obterCaminho(vertices: Array<number>, inicio: number, fim: number): Array<V> {
    const caminho: Array<V> = []; // Inicializa o caminho
    let verticeAtual = fim; // Inicializa o vértice atual com o vértice de fim

    // Verifica se há um caminho válido até o vértice inicial
    if (vertices[fim] === Infinity) {
      throw new Error("Caminho não encontrado");
    }

    // Constrói o caminho do fim ao início
    while (verticeAtual !== inicio) {
      caminho.unshift(this.vertices[verticeAtual]); // Adiciona o vértice atual ao início do caminho

      // Pega os vizinhos do vértice atual com os pesos
      const vizinhos =
        this.obterVizinhosDoVerticePorIndiceComPesos(verticeAtual);

      let menorDistancia = Infinity; // Inicializa a menor distância com infinito
      let proximoVertice = -1; // Inicializa o próximo vértice com -1q

      // Para cada vizinho do vértice atual
      for (const vizinho of vizinhos) {
        // Obtém o índice do vizinho
        const indiceVizinho = this.vertices.indexOf(vizinho.vertice);
        // Calcula a distância do vértice atual ao vizinho
        const distancia = vertices[indiceVizinho] + vizinho.peso;

        // Se a distância for menor que a menor distância, atualiza a menor distância e o próximo vértice

        /** Mostrando um exemplo para entender melhor:
         * Suponha que estamos no vértice 1 e temos os vizinhos 2 e 3
         * A distância do vértice 1 ao vértice 2 é 5 e a distância do vértice 1 ao vértice 3 é 3
         * A distância do vértice 2 ao vértice 3 é 1
         * Se a distância do vértice 1 ao vértice 2 é 5 e a distância do vértice 2 ao vértice 3 é 1
         * A distância do vértice 1 ao vértice 3 é 6
         * Portanto, o próximo vértice é o vértice 3
         * Se a distância do vértice 1 ao vértice 3 é 3, o próximo vértice é o vértice 2
         * O algoritmo escolhe o caminho com a menor distância
         */
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          proximoVertice = indiceVizinho;
        }
      }

      if (proximoVertice === -1) {
        throw new Error("Caminho não encontrado");
      }

      verticeAtual = proximoVertice;
    }

    caminho.unshift(this.vertices[inicio]);

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
  "Rio Grande do Sul",
  "Santa Catarina",
  "Paraná",
  "São Paulo",
  "Rio de Janeiro",
  "Espírito Santo",
  "Goiás",
  "Minas Gerais",
  "Mato Grosso",
  "Mato Grosso do Sul",
];

const grafo = new GrafoComPeso<string>(estados);

// Fronteiras reais entre os estados com pesos 1
grafo.adicionarArestaUsandoVerticesComPeso(
  "Rio Grande do Sul",
  "Santa Catarina",
  1
);
grafo.adicionarArestaUsandoVerticesComPeso("Santa Catarina", "Paraná", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Paraná", "São Paulo", 1);
grafo.adicionarArestaUsandoVerticesComPeso(
  "São Paulo",
  "Mato Grosso do Sul",
  1
);
grafo.adicionarArestaUsandoVerticesComPeso("São Paulo", "Goiás", 1);
grafo.adicionarArestaUsandoVerticesComPeso("São Paulo", "Minas Gerais", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Rio de Janeiro", "Minas Gerais", 1);
grafo.adicionarArestaUsandoVerticesComPeso(
  "Rio de Janeiro",
  "Espírito Santo",
  1
);
grafo.adicionarArestaUsandoVerticesComPeso("Espírito Santo", "Minas Gerais", 1);
grafo.adicionarArestaUsandoVerticesComPeso(
  "Minas Gerais",
  "Mato Grosso do Sul",
  1
);
grafo.adicionarArestaUsandoVerticesComPeso("Minas Gerais", "Goiás", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Goiás", "Mato Grosso do Sul", 1);
grafo.adicionarArestaUsandoVerticesComPeso("Goiás", "Mato Grosso", 1);
grafo.adicionarArestaUsandoVerticesComPeso(
  "Mato Grosso",
  "Mato Grosso do Sul",
  1
);

console.log(grafo.toString());
