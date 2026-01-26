const BASE_URL = "http://localhost:9090";

export async function loginUser(credentials){
    const response = await fetch(`${BASE_URL}/auth/login`,{
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(credentials),
    })

    if(!response.ok){
        throw new Error("Invalid Email or Password!");
    }
    return response.json();
}