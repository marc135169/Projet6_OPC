
export async function deleteWork(item) {
    
    const response = await fetch(`http://localhost:8080/api/works/${item.id}`, {

        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        
        })
    });
    if (response.ok) {
        console.log(response);
    }
    
    
    
}