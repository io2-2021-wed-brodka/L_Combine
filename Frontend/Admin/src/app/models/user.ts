export default interface User{
    username: string;
    id: string;
    status: UserStatus; 
}
export enum UserStatus{
    Blocked="blocked",
    Active="active",
}