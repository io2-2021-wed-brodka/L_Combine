export default interface User{
    username: string;
    id: string;
}
export enum UserStatus{
    Blocked="blocked",
    Active="active",
}