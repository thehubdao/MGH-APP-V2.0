import { MdKeyboardArrowDown } from "react-icons/md";
import { CHART_ROUTES } from "../../../utils/analyticsChart";
import { useEffect, useRef, useState } from "react";
import { AnalyticsChartRoutes } from "../../../enums/charts";

// Interface for props used in the ChartNameFilterSelectorUI component.
interface ChartNameFilterSelectorUIProps {
  visibleCharts: AnalyticsChartRoutes[]; // Array of currently visible chart routes
  setVisibleCharts: React.Dispatch<React.SetStateAction<AnalyticsChartRoutes[]>>; // Function to set the array of visible chart routes
}


// Interface for props used in the FilterItem component.
interface FilterItemProps {
  label: string; // Label for the filter item
  isChecked: boolean; // Flag indicating if the checkbox is checked or not
  handleChange: Function; // Function to handle checkbox state changes
}

//* FilterItem component represents a single filter item with a label and checkbox.
const FilterItem = ({ label, isChecked, handleChange }: FilterItemProps) => {
  const [checked, setChecked] = useState<boolean>(isChecked);

  return (
    <button className="w-full flex justify-between items-center gap-3 cursor-default">
      <p className="truncate">{label}</p>
      <input
        type="checkbox"
        checked={checked}
        className="cursor-pointer"
        onChange={(e) => {
          e.stopPropagation();
          setChecked(!checked);
          handleChange();
        }}
      />
    </button>
  );
};

//* Main component for the chart name filter selector.
export default function ChartNameFilterSelectorUI({
  visibleCharts,
  setVisibleCharts,
}: ChartNameFilterSelectorUIProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Function to handle checkbox changes for the chart filters
  const handleCheckboxChange = (chart: AnalyticsChartRoutes) => {
    let copyOfVisibleCharts = [...visibleCharts];
    if (copyOfVisibleCharts.includes(chart)) {
      copyOfVisibleCharts = copyOfVisibleCharts.filter((item) => item !== chart);
    } else {
      copyOfVisibleCharts.push(chart);
    }
    setVisibleCharts(copyOfVisibleCharts);
  };

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropDownOpen(false);
      } else if (buttonRef.current && buttonRef.current.contains(e.target as Node)) {
        setIsDropDownOpen(!isDropDownOpen);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative w-fit">
      {/* Button to toggle the dropdown */}
      <button className="relative flex justify-center items-center rounded-lg h-12 shadow-relief-12 bg-nm-fill px-14 gap-2" ref={buttonRef}>
        <p>FILTER CHARTS</p>
        {/* Dropdown icon */}
        <MdKeyboardArrowDown className={`absolute right-7 transition-all duration-200 ${isDropDownOpen && '-rotate-180'}`} size={24} />
      </button>
      {/* Dropdown content */}
      {isDropDownOpen && (
        <div
          className="flex justify-center items-center flex-col absolute w-fit shadow-relief-12 bg-nm-fill px-8 pt-8 z-10 pb-5 mt-5 rounded-lg gap-2 -left-3"
          ref={dropdownRef}
        >
          {/* Rendering filter items */}
          {CHART_ROUTES.map(chart => {
            return (
              <FilterItem
                key={chart[0]}
                label={chart[1].label}
                isChecked={visibleCharts.includes(chart[0])}
                handleChange={() => handleCheckboxChange(chart[0])}
              />
            );
          })}
          {/* Button to clear filters */}
          <button onClick={() => {
            setVisibleCharts([]);
            setIsDropDownOpen(false);
          }}>
            <p className="hover:underline hover:font-bold font-medium">clean filters</p>
          </button>
        </div>
      )}
    </div>
  );
}