export interface Item {
  _id: string;
  uuid: string;
  title: string;
  type: string;
  source: string;
  description: string;
  dueDate: Date | null;
  status: 'null' | 'todo' | 'in progress' | 'done' | 'archive';
  id: string;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
  spaces: string[];
  blocks: string[];
  user: string;
  labels: string[];
  isCompleted: boolean;
  isArchived: boolean;
  isDeleted: boolean;
}