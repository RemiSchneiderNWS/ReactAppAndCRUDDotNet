import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { getUserConnected } from "../../services/AuthServices";
import { UserContext } from "../../services/context/UserContext";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const HandleCRUD = () => {
    history.push("/CrudObject");
  };
  return (
    <div>
      <h1 style={{ marginBottom: "5%" }}>
        Bienvenue sur L'application de CRUD
      </h1>
      <p>Ceci est une application qui sert de base pour en créer d'autres.</p>
      <p>
        Un système de connection est mit en place. Vous pouvez utiliser
        l'inscription et la connexion pour accéder au reste de l'app{" "}
      </p>
      {user ? (
        <div>
          <Button
            variant="outlined"
            onClick={() => HandleCRUD()}
            style={{ color: "red" }}
          >
            {" "}
            CRUD's exemple{" "}
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              getUserConnected().then((response) => console.log(response))
            }
          >
            {" "}
            see user connected{" "}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
