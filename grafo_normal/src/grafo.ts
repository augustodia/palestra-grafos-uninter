import { Aresta } from "./aresta";

// 1- Implementação de um grafo não direcionado

// O Grafo recebe um tipo genérico V para representar os vértices, que podem ser de qualquer tipo.
// No nosso caso, os vértices são strings (nomes dos Estados), mas poderiam ser números, objetos, etc.
export class Grafo<V> {
  vertices: Array<V> = []; // Inicia os vértices como um array vazio

  // 2- Criar a classe Aresta
  arestas: Array<Array<Aresta>> = []; // Inicia as arestas como um array de arrays vazio
  /**
   * As arestas são uma matriz porque cada vértice pode ter várias arestas conectadas a ele.
   * Cada linha da matriz representa um vértice e cada coluna representa uma aresta conectada a esse vértice.
   *
   * Estados do Brasil:
   * [
   * "Rio Grande do Sul", // Vértice 0
   * "Santa Catarina", // Vértice 1
   * "Paraná" // Vértice 2
   * ]
   *
   * Ex de matriz de adjacência:
   * [
   *  [ { de: 0, para: 1 } ], // Vértice 0
   *  [ { de: 1, para: 0 }, { de: 1, para: 2 } ], // Vértice 1
   *  [ { de: 2, para: 0 } ] // Vértice 2
   * ]
   */

  // O construtor recebe um array de vértices e inicia as arestas como um array vazio do mesmo tamanho do array de vértices.
  constructor(vertices: Array<V> = []) {
    this.vertices = vertices;
    this.arestas = vertices.map(() => []);
  }

  // Retorna o número de vértices no grafo. Vai ser útil para iterar sobre os vértices.
  obterNumeroDeVertices(): number {
    return this.vertices.length;
  }

  /**
   * Adiciona uma nova aresta ao grafo. Recebe dois vértices e adiciona a aresta ao vértice de origem e ao vértice de destino.
   * Os vértices já foram adicionados ao grafo por meio do construtor.
   */
  adicionarArestaUsandoVertices(de: V, para: V): void {
    /**
     * Os índices dos vértices são as posições deles no array de vértices.
     * Começa sempre em 0.
     */

    const i = this.vertices.indexOf(de); // Encontra o índice do vértice de origem
    const j = this.vertices.indexOf(para); // Encontra o índice do vértice de destino

    if (i === -1 || j === -1) {
      // Se não encontrar o vértice, lança um erro
      throw new Error("Vértice não encontrado");
    }

    this.adicionarArestaUsandoIndices(i, j); // Adiciona a aresta ao grafo
  }

  // Adiciona uma nova aresta ao grafo. Recebe um objeto Aresta e adiciona a aresta ao vértice de origem e ao vértice de destino.
  adicionarNovaAresta(a: Aresta): void {
    // Verificar se já existe ligação entre os vértices. Se sim, não adiciona a aresta.
    // Isso evita que sejam adicionadas arestas duplicadas.
    const arestaExistente = this.arestas[a.de].find((aresta) => {
      return aresta.para === a.para;
    });

    if (arestaExistente) return;

    this.arestas[a.de].push(a); // Adiciona a aresta ao vértice de origem (de)
    this.arestas[a.para].push(a.inverter()); // Adiciona a aresta invertida ao vértice de destino (para)
    /**
     * Ex: Se adicionarmos uma aresta de 0 para 1, também adicionamos uma aresta de 1 para 0.
     * Isso é necessário para que o grafo seja não direcionado.
     * Rio Grande do Sul -> Santa Catarina e Santa Catarina -> Rio Grande do Sul
     */
  }

  // Adiciona uma nova aresta ao grafo. Recebe os índices dos vértices de origem e destino.
  protected adicionarArestaUsandoIndices(
    indexDe: number,
    indexPara: number
  ): void {
    this.adicionarNovaAresta(new Aresta({ de: indexDe, para: indexPara }));
  }
  /** Estamos chamando uma função dentro de outra função.
   * Isso pode parecer estranho, mas é uma prática comum em programação.
   * Pois, ao chamar uma função dentro de outra função, estamos dividindo o código em partes menores e mais fáceis de entender.
   */

  // Retorna o vértice de um índice específico.
  obterVerticePorIndice(i: number): V {
    return this.vertices[i];
  }

  // Retorna o índice de um vértice específico.
  obterIndiceDoVertice(v: V): number {
    return this.vertices.indexOf(v);
  }

  // Retorna os vizinhos de um vértice específico, dado o índice do vértice.
  obterVizinhosDoVerticePorIndice(index: number): Array<V> {
    return this.arestas[index].map((aresta) => {
      return this.obterVerticePorIndice(aresta.para);
    });
  }

  // Retorna os vizinhos de um vértice específico, dado o vértice.
  obterVizinhosDoVertice(v: V): Array<V> {
    const index = this.obterIndiceDoVertice(v); // Encontra o índice do vértice

    return this.obterVizinhosDoVerticePorIndice(index); // Retorna os vizinhos do vértice
  }

  // Retorna as arestas conectadas a um vértice específico, dado o índice do vértice.
  obterArestasConectadasAoVerticePorIndice(index: number): Array<Aresta> {
    return this.arestas[index];
    /**
     * Ex de retorno: [{ de: 0, para: 1 }, { de: 0, para: 2 }]
     */
  }

  // Retorna as arestas conectadas a um vértice específico, dado o vértice.
  obterArestasConectadasAoVertice(v: V): Array<Aresta> {
    const index = this.obterIndiceDoVertice(v); // Encontra o índice do vértice

    return this.obterArestasConectadasAoVerticePorIndice(index); // Retorna as arestas conectadas ao vértice
  }

  /**
   * Dado os vértices: ["Rio Grande do Sul", "Santa Catarina", "Paraná"]
   * E as arestas: [{ de: 0, para: 1 }, { de: 1, para: 2 }]
   * O método irAte("Rio Grande do Sul", "Paraná") deve retornar ["Rio Grande do Sul", "Santa Catarina", "Paraná"]
   *
   * Essa busca é feita usando a técnica de busca em largura (BFS).
   * A BFS é uma técnica de busca em grafos que começa pelo vértice de origem e explora todos os vértices vizinhos antes de avançar para os vizinhos dos vizinhos.
   * Isso é feito usando uma fila para armazenar os vértices a serem visitados.
   * A BFS é útil para encontrar o caminho mais curto entre dois vértices em um grafo não ponderado.
   * Se o grafo for ponderado, é necessário usar a técnica de busca em profundidade (DFS) ou o algoritmo de Dijkstra.
   * O método irAte retorna um array com o caminho percorrido a partir do vértice de origem até o vértice de destino.
   * Se não encontrar um caminho, retorna um array vazio.
   */
  irAte(origem: V, destino: V): Array<V> {
    const fila = [origem]; // Inicia a fila com o vértice de origem.
    const visitados = new Set<V>(); // Inicia um conjunto de vértices visitados. Conjunto é uma coleção de valores únicos, sem repetição.
    const anteriores = new Map<V, V>(); // Inicia um mapa de vértices anteriores. Mapa é uma coleção de pares chave-valor.
    /**
     * O mapa de vértices anteriores é útil para armazenar o vértice anterior de cada vértice visitado.
     * Isso é importante para reconstruir o caminho percorrido a partir do vértice de destino até o vértice de origem.
     * Ex: { "Santa Catarina" => "Rio Grande do Sul", "Paraná" => "Santa Catarina", ... }
     */

    // Enquanto a fila não estiver vazia...
    while (fila.length > 0) {
      let vertice = fila.shift() as V; // Remove o primeiro vértice da fila e o armazena em uma variável.
      visitados.add(vertice); // Adiciona o vizinho ao conjunto de vértices visitados.

      // Se o vértice for o destino, retorna o caminho, pois não precisamos mais procurar.
      if (vertice === destino) {
        const caminho = [vertice]; // Inicia o caminho com o vértice de destino.

        // Enquanto houver vértices anteriores...
        /**
         * Esse loop percorre o mapa de vértices anteriores, adicionando cada vértice ao início do caminho.
         * Ele é útil para reconstruir o caminho percorrido a partir do vértice de destino até o vértice de origem.
         * O has verifica se o mapa contém a chave especificada.
         */
        while (anteriores.has(vertice)) {
          vertice = anteriores.get(vertice) as V; // Atualiza o vértice com o vértice anterior.
          caminho.unshift(vertice); // Adiciona o vértice ao início do caminho.
        }

        return caminho; // Retorna o caminho percorrido.
      }

      // Para cada vizinho do vértice...
      this.obterVizinhosDoVertice(vertice).forEach((vizinho) => {
        if (!visitados.has(vizinho)) {
          // Se o vizinho não foi visitado...
          anteriores.set(vizinho, vertice); // Define o vértice como anterior do vizinho. // Chave: próximo vértice, Valor: vértice atual, que é o anterior.
          // Se o vizinho tiver mais

          fila.push(vizinho); // Adiciona o vizinho à fila.
        }
      });
    }

    return []; // Retorna um array vazio se não encontrar um caminho.
  }

  toString(): string {
    return this.vertices
      .map((v, i) => {
        return `${this.obterVerticePorIndice(
          i
        )} -> [${this.obterVizinhosDoVerticePorIndice(i).join(", ")}]`;
      })
      .join("\n");
  }
}

/**
 * Explicação completa de BFS:
 * https://www.freecodecamp.org/news/breadth-first-search-bfs-in-javascript-algorithm-tutorial/
 *
 * Explicação completa de DFS:
 * https://www.freecodecamp.org/news/depth-first-search-dfs-in-javascript-algorithm-tutorial/
 */

// Estados do Brasil
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
