export const _todos = [
  { content: 'Buy groceries', done: true, id: 1 },
  { content: 'Pay bills', done: false, id: 2 },
  { content: 'Read a book', done: false, id: 3 },
  { content: 'Go for a walk', done: false, id: 4 },
  { content: 'Watch a movie', done: false, id: 5 },
];

export type Todo = {
  content: string;
  done: boolean;
  id: number;
};
