import React, {
  useContext,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { DataContext } from "./DataProvider";
import { regions } from "../utils/data";
import "./List.css";

const marginTop = 70;
const marginBottom = 20;

const List = ({ region, onClick }) => {
  const data = useContext(DataContext);
  const [cols, setCols] = useState(null);
  const container = useRef();

  const legend = useMemo(
    () => regions.find((c) => c.id === region).legend,
    [region]
  );

  const lists = useMemo(() => {
    if (legend && data) {
      setCols(null);

      return legend.map(({ type, name, color, symbol }) => ({
        name,
        color,
        symbol,
        items: data[type]
          .filter(
            (country) =>
              region === "all" ||
              country.region.toLowerCase() === region.replace("-", " ")
          )
          .map((c) => c.name)
          .sort(),
      }));
    }
  }, [legend, data, region]);

  const onResize = useCallback(() => {
    if (lists && container.current) {
      const { clientHeight } = container.current;
      const count = Math.floor((clientHeight - marginTop - marginBottom) / 20);
      const cols = lists.map(({ items }) => Math.ceil(items.length / count));

      setCols(cols);
    }
  }, [container, lists]);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  return (
    <div className="ChartList">
      <div className="wrapper" style={{ top: 5 }}>
        <div id="list" ref={container} className="List List-show">
          <div className="container">
            {cols &&
              lists &&
              lists.map(({ name, color, symbol, items }, index) => {
                const numCols = cols[index];

                return (
                  <div
                    key={name}
                    className="section"
                    style={{
                      flexGrow: numCols,
                      flexShrink: numCols,
                    }}
                  >
                    <h2>
                      {color ? (
                        <span
                          className="color"
                          style={{ backgroundColor: color }}
                        ></span>
                      ) : symbol ? (
                        <span
                          className="symbol"
                          style={{ backgroundImage: `url("${symbol}.png")` }}
                        ></span>
                      ) : null}
                      {name}
                      {items.length > 1 ? <> ({items.length})</> : null}
                    </h2>
                    <ul
                      style={{
                        columnCount: numCols,
                      }}
                    >
                      {items.map((name) => (
                        <li key={name} onClick={() => onClick(name)}>
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
