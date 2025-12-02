import { ICONS, windw as Wind, waterw as Water } from "../assets/images";
import { kelvinToCelsius, FALLBACK_VALUES } from "../utils/constants";

function TempStats(props) {
  return (
    <div className="h-7/10 gap-[0.3em] flex flex-col justify-center items-center">
      <div className="flex justify-center items-center h-45/100 md:h-5/10 xl:h-7/10 gap-[1em] md:gap-[0.7rem]">
        <div className="text-[8em] w-49/100 md:w-55/100 md:text-[12em] xl:text-[13em]  select-none">
          {props.temp !== undefined && props.temp !== null ? kelvinToCelsius(props.temp) : FALLBACK_VALUES.temperature}
        </div>

        <div className="flex flex-col space-y-[1em] md:space-y-[1.5em] ">
          <div className="w-[2em] h-[2em] ring-3 rounded-full xl:w-[3.5em] xl:h-[3.5em] md:w-[3em] md:h-[3em]"></div>

          <div className="flex flex-col gap-[0.25em] px-[0.25em] md:px-[0.625em] ">
            <div className="flex md:text-[1.2em] xl:text-[1.4em]  whitespace-nowrap">
              <img src={Wind} alt="wind" className="w-[1.5em]" />
              &nbsp;&nbsp;{props.wind !== undefined && props.wind !== null ? `${props.wind} mph` : FALLBACK_VALUES.wind}
            </div>

            <div className="flex xl:text-[1.25em]">
              <img src={Water} alt="water" className="w-[1.5em]" />
              &nbsp;&nbsp;{props.humidity !== undefined && props.humidity !== null ? `${props.humidity} %` : FALLBACK_VALUES.humidity}
            </div>
          </div>
        </div>
      </div>

      <div className="flex text-[1.25em]">
        <div>Feels Like&nbsp;</div>
        <div>{props.feel !== undefined && props.feel !== null ? kelvinToCelsius(props.feel) : FALLBACK_VALUES.temperature}</div>
      </div>

      <div className="text-[2.5em] flex gap-[0.3em] items-center">
        <img
          src={ICONS[props.icon] || ICONS['01d']}
          alt={props.condition || "weather icon"}
          className="w-[1em]"
        />
        <div className="capitalize">{props.condition ? props.condition : FALLBACK_VALUES.condition}</div>
      </div>
    </div>
  );
}

export default TempStats;
