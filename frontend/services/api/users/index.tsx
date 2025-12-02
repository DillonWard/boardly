import { api } from '../index'
import { Project } from '../projects';

export async function getUsers<T>(): Promise<T> {
  return api.get<T>('users');
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  projects: Project[]

}