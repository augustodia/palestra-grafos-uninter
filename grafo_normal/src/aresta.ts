type ArestaProps = {
  de: number;
  para: number;
};

// Conexão
export class Aresta {
  de: number;
  para: number;

  constructor(props: ArestaProps) {
    this.de = props.de;
    this.para = props.para;
  }

  inverter(): Aresta {
    return new Aresta({ de: this.para, para: this.de });
  }

  toString(): string {
    return `${this.de.toString()} -> ${this.para.toString()}`;
  }
}
