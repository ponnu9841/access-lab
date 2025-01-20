type User = {
    email: string;
    id: string;
    name: string | null;
    created_at?: Date;
    updated_at?: Date | null;
} | null

type UserWithPassword = User & {
	password
}

type UserAlt = {
    name: string | null;
    email: string;
    type: string;
}