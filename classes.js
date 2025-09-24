export class Cliente {
  constructor(nome, email, id = null) {
    this.nome = nome;
    this.email = email;
    this.id = id; // vem do CrudCrud (_id)
  }
}
