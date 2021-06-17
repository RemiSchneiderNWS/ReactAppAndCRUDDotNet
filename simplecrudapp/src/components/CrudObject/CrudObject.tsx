import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import material from "../../models/Material";
import {
  DeleteMaterial,
  getListMaterial,
  PostMaterial,
  setNewNameMaterial,
} from "../../services/materialServices";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      display: "flex",
      margin: "auto",
      marginTop: "50px",
    },
  })
);

export default function CrudObject() {
  const classes = useStyles();
  const [changeDetected, setChangeDetected] = useState(true);
  const [listMaterial, setListMaterial] = useState<material[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const material: material = { id: 0, name: data.name };
    PostMaterial(material).then(() => setChangeDetected(!changeDetected));
  };

  useEffect(() => {
    getListMaterial().then((list) => {
      setListMaterial(list);
      console.log(list);
    });
  }, [changeDetected]);
  const HandleDelete = (idx: number) => {
    DeleteMaterial(idx).then(() => setChangeDetected(!changeDetected));
  };
  return (
    <div>
      <p data-testid="fifrolin">Exemple simple de CRUD complet</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("name", { required: true })}
          variant="outlined"
          fullWidth
          placeholder="enter a name"
        />
        <Button className={classes.center} variant="contained" type="submit">
          Add Item{" "}
        </Button>
      </form>
      {listMaterial !== undefined
        ? listMaterial.map((listMaterial, idx) => (
            <div>
              {idx} {listMaterial.name}{" "}
              <TextField
                variant="outlined"
                fullWidth
                placeholder="enter a new name"
                onChange={(e) => {
                  setNewNameMaterial(listMaterial.id, e.target.value).then(() =>
                    setChangeDetected(!changeDetected)
                  );
                }}
              />
              <Button
                variant="outlined"
                onClick={() => HandleDelete(listMaterial.id)}
                style={{ color: "red" }}
                type="submit"
              >
                {" "}
                delete{" "}
              </Button>
            </div>
          ))
        : null}
    </div>
  );
}
