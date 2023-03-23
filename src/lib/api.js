export async function getProject(id) {
    const res = await fetch(`http://127.0.0.1:5173/project/${id}`);
    console.log(res)
    const data = await res.json()
    console.log("res")
    return data;
  }