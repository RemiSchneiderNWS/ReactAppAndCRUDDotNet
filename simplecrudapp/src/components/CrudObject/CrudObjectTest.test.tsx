import { render } from "@testing-library/react";
import { timeLog } from "console";
import CrudObject from "./CrudObject";
test("crud object", () => {
  const component = render(<CrudObject />);
  const title = component.getByTestId("fifrolin");
  expect(title.textContent).toContain("Exemple");
});
