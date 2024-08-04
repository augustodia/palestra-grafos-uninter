import { Aresta } from "./aresta";
type ArestaComPesoProps = {
  de: number;
  para: number;
  peso: number;
};

export class ArestaComPeso extends Aresta {
  peso: number;

  constructor(props: ArestaComPesoProps) {
    super(props);
    this.peso = props.peso;
  }

  inverter(): ArestaComPeso {
    return new ArestaComPeso({ de: this.para, para: this.de, peso: this.peso });
  }

  menorQue(outra: ArestaComPeso): boolean {
    return this.peso < outra.peso;
  }

  toString(): string {
    return `${this.de.toString()} ${this.peso.toString()} -> ${this.para.toString()}`;
  }
}
