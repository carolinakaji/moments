// Criando interface padrão para respostas. usando o tipo generic
export interface Response<T> {
  // o T é um generic, ele pode ser qualquer coisa
  message?: string,
  data: T // O dado pode ser qualquer coisa, um comentário, um momento
}
