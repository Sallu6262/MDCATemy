const getUserLoader = async () => {
    try{
        const API_URL = import.meta.env.VITE_API_URL;

        const res = await fetch(`${API_URL}/users/me`,{
            credentials: 'include'
        });

        const user = await res.json();
        return user;
    } catch(err){
        return null;
    }
}

export default getUserLoader;