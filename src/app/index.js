import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Article from "./article";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          exact path="/"
          element={<Main />}/>
        <Route
          exact path="/article/:id"
          element={<Article />} />
      </>
    )
  );
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
