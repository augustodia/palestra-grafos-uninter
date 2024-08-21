export function initializeCanvas(canvas: HTMLCanvasElement): void {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

export function drawGraph(
  ctx: CanvasRenderingContext2D,
  grafo: any,
  estados: any[]
): void {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawEdges(ctx, grafo, estados);
  drawVertices(ctx, grafo, estados);
}

export function drawVertices(
  ctx: CanvasRenderingContext2D,
  grafo: any,
  estados: any[]
): void {
  for (let i = 0; i < grafo.obterNumeroDeVertices(); i++) {
    const vertice = estados[i];
    const x = vertice.x * ctx.canvas.width;
    const y = vertice.y * ctx.canvas.height;

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

export function drawEdges(
  ctx: CanvasRenderingContext2D,
  grafo: any,
  estados: any[]
): void {
  for (let i = 0; i < grafo.obterNumeroDeVertices(); i++) {
    const vertice = estados[i];
    const x = vertice.x * ctx.canvas.width;
    const y = vertice.y * ctx.canvas.height;

    const vizinhos = grafo.obterVizinhosDoVerticePorIndice(i);
    vizinhos.forEach((vizinho) => {
      const vizinhoVertice = estados[grafo.obterIndiceDoVertice(vizinho)];
      const vizinhoX = vizinhoVertice.x * ctx.canvas.width;
      const vizinhoY = vizinhoVertice.y * ctx.canvas.height;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(vizinhoX, vizinhoY);
      ctx.strokeStyle = "#CCCCCC";
      ctx.stroke();
    });
  }
}

export function drawPath(
  ctx: CanvasRenderingContext2D,
  caminho: string[],
  estados: any[]
): void {
  for (let i = 0; i < caminho.length - 1; i++) {
    const origem = estados.find((estado) => estado.nome === caminho[i]);
    const destino = estados.find((estado) => estado.nome === caminho[i + 1]);

    if (origem && destino) {
      const origemX = origem.x * ctx.canvas.width;
      const origemY = origem.y * ctx.canvas.height;
      const destinoX = destino.x * ctx.canvas.width;
      const destinoY = destino.y * ctx.canvas.height;

      ctx.beginPath();
      ctx.moveTo(origemX, origemY);
      ctx.lineTo(destinoX, destinoY);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }
}
