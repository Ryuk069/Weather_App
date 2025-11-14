import "./tempStats.css";
import Wind from "../../assets/windw.png";
import Water from "../../assets/waterw.png";
import Display from "../display/display";

function TempStats(props) {
  // ✅ component name should start with capital letter

  function kelvinToCelsius(kelvin) {
    if (kelvin == null) return "-"; // handle undefined/null safely
    return (kelvin - 273.15).toFixed(0) + "°";
  }

  return (
    <div className="stats" style={props?.small ? {border: "0px solid", height: "80%",margin: "20px"} : {}}> 
      <div className="first-stat" style={props?.small ? {border: "0px solid",fontSize:"4px",display: "flex", alignItems: "baseline", justifyContent: "end"} : {}}>
        <div className="temp" style={props?.small ? {border: "0px solid"} : {}}>
          {props.temp ? kelvinToCelsius(props.temp) : "69°"}
        </div>

        <div className="stat" style={props?.small ? {border: "0px solid",left: "10px",top: "-20px",fontSize: "4em"} : {}}>
          <div className="wind">
            <img src={Wind} alt="wind" width={15} />
            &nbsp;&nbsp;{props.wind ? `${props.wind} mph` : "150 mph"}
          </div>

          <div className="humidity">
            <img src={Water} alt="water" width={15} />
            &nbsp;&nbsp;{props.humidity ? `${props.humidity} %` : "99 %"}
          </div>
        </div>
      </div>

      {props.small && (
        <div className="small-stat">
          <div className="small-label">feels Like&nbsp;</div>
          <div className="small-temp">{kelvinToCelsius(props.feel)}</div>
        </div>
      )}

      <div className="second-stat" style={props?.small ? {border: "0px solid", fontSize: "1.3em",width:"100%"} : {}}>
        <div className="condition">{(props.condition)}</div>
      </div>
    </div>
  );
}

export default TempStats;
