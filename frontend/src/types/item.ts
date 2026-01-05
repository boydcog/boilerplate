export interface Item {
  id: number;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ItemCreate {
  title: string;
  description?: string;
  is_active?: boolean;
}

export interface ItemUpdate {
  title?: string;
  description?: string;
  is_active?: boolean;
}
