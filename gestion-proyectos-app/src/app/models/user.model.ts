export type UserType = 'admin' | 'empleado';

export interface User {
    id: number;
    username: string;
    password: string;
    userType: UserType;
    empleadoId?: number;
}