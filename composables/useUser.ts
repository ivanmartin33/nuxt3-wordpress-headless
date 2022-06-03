import { User, DEFAULT_USER } from "@/types/auth";

export const useUser = () => useState<User>("user", () => null);
