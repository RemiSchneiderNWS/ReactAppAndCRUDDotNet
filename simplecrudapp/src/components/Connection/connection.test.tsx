import User from "../../models/User";
import { login } from "../../services/AuthServices";

test("crud object", async () => {
  const user: User = { email: "root", password: "root" };
  let status: number = 0;

  const request = await login(user);
  //expect(request.status).toBe(200);
});
