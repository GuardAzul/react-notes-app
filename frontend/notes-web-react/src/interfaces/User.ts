export interface User {
    email: string;
    password: string;
}

export interface UserResponse {
    UserCredentials?: User[];
    Name?: String;
    Response: String;
    Error?: String;
}