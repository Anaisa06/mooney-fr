export interface Category {
    id: number
    name: string
    isCustom: boolean
    icon: any
  }

  export interface CreateCategory {
    name: string;
    isCustom: boolean;
    icon: string;
  }