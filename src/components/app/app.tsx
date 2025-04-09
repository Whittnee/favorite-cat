import { FC } from "react";
import { getCat } from "../../utils/api";
import styles from "./app.module.scss";
import { Card } from "../card";
const App: FC = () => {

  return (
    <div className={styles.app}>
      <Card />
    </div>
  ) 
};

export default App;
