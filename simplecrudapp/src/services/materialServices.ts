import material from "../models/Material";
import serverAdress from "./GlobalVariable";
export async function PostMaterial(material: material) {

    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: material.name,
        }),
      };

      const response = await fetch(serverAdress + "api/Material/newMaterial", requestOptions);
      const data = await response.json();
      return data;
}

export async function getListMaterial() {
    const response = await fetch(serverAdress + "api/Material");
    const data = await response.json();
    return data;
}

export async function DeleteMaterial(id: number) {
    const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        
      };
   await fetch(serverAdress + "api/Material/"+ id,requestOptions);
}

export async function setNewNameMaterial(id : number,newName: string) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: newName,
    }),
  };

  await fetch(serverAdress + "api/Material/update/" + newName, requestOptions)
}