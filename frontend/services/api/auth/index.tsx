import { api } from '../index'

export async function login<T>(userData: any): Promise<T>{
    return api.post<T>('auth/login', userData)
}