import { api } from "../index";
import { User } from "../users";

export async function getProjects<T>(): Promise<T> {
  return api.get<T>('projects');
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  users: User[];
}