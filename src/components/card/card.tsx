import React, { FC, memo, useCallback, useEffect, useState } from "react";
import styles from "./card.module.scss";
import { getCat } from "../../utils/api";
import { TCat } from "../../types/types";
import { Preloader } from "../ui/prelaoder";



export const Card: FC = () => {
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cat, setCat] = useState<TCat>({ id: "", url: "", width: 0, height: 0 });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getCat();
      setCat(response[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchData();
      }, 5000)
      return () => clearInterval(interval)
    };
  }, [autoRefresh]);

  return isLoading ? <Preloader /> : (
    <article className={styles.card}>
      <div className={styles.actions}>
        <label>
          <input type="checkbox" name="enabled" />
          Enabled
        </label>
        <label>
          <input
            type="checkbox"
            name="autoRefresh"
            checked={autoRefresh}
            onChange={() => setAutoRefresh((prev) => !prev)}
          />
          Auto-refresh every 5 seconds
        </label>
        <button className={styles.button} onClick={fetchData}>Get cat</button>
      </div>
      <img src={cat?.url} alt="cat"/>
    </article>
  );
};
