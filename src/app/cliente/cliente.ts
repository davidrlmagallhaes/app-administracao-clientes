import { Endereco } from "./endereco";

export class Cliente {
    id!: number;
    nome: string = '';
    data_nascimento!: Date;
    cpf: string = '';
    rg: string = '';
    telefone: string = '';

    enderecos = new Array<Endereco>();
}
