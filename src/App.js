import "./App.css";
import List from "./shopping-cart/List";
import Card from "./shopping-cart/Card";
import { ShopTodoProvider } from "./contextState";


function App() {

  return (
    <ShopTodoProvider>
      <Card />
      <List />
    </ShopTodoProvider>
  );
}
export default App;
