import { useMemo } from "react/cjs/react.development";

export function useFilterUserame(users, userName) {
    const filteredUsers = useMemo(() => {
        return users.filter(user => user.username === userName);
    }, [users, userName]);

    return filteredUsers;
}
export function useFilterPassword(users, password) {
    const filteredUser = useMemo(() => {
        return users.filter(user => user.password === password);
    }, [users, password])
    
    return filteredUser;
}
export function useUsers(users, userName, password) {
    const filteredUserByUsername = useFilterUserame(users, userName);
    const filteredUserByPassword = useFilterPassword(filteredUserByUsername, password);
    
    return filteredUserByPassword;
}