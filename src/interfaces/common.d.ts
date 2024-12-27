import { ReactNode } from "react";

export type AvatarProps = {
    name?: string,
    image?: string | ReactNode,
    avatarClassName?: string,
    avatarImageClassName?: string,
    avatarFallbackClassName?: string,
}