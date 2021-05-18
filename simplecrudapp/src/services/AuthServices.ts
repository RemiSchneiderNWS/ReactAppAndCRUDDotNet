import User from "../models/User";
import serverAdress from "./GlobalVariable";

export async function Register(user:User) {

    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      };
    
      const response = await fetch(serverAdress + "api/Users", requestOptions);
      const data = await response.json();
      return data;
}

export async function login(user: User) {

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    };

    const response = await fetch(
      serverAdress + "api/Users/login", requestOptions
    );
    const useridentificated = await response.json();
    return useridentificated ;
  }
