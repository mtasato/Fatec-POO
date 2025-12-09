export type TaskStatus = 'pendente' | 'concluída';

export interface Task {
    id: string;
    titulo: string;
    descricao: string;
    status: TaskStatus;
    createdAt: Date;
}

export type SortOrder = 'all' | 'pendente' | 'concluída';