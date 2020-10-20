import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
const url = "https://course-api.netlify.app/api/react-tabs-project";

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [tabs, setTabs] = React.useState([]);
  const [value, setValue] = React.useState(0);

  // Fetching
  const fetching = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setTabs(data);
    console.log(data);
    setLoading(false);
  };
  React.useEffect(() => {
    fetching();
  }, []);
  if (loading) {
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    );
  }
  const { title, dates, duties, company } = tabs[value];
  return (
    <div>
      <h1 className="text-center text-4xl text-purple-800 my-8">Experience</h1>
      <div className="md:flex md:">
        <div className="flex justify-center mb-8 md:flex-col md:mx-16 md:justify-start">
          {/* Buttons */}
          {tabs.map((tab, index) => {
            return (
              <button
                key={index}
                className={`${
                  index === value
                    ? "text-purple-600 uppercase inline-block mx-4 border-purple-600 border-b md:mb-6 md:text-xl"
                    : "text-purple-400 uppercase inline-block mx-4 hover:border-purple-600 hover:boder-b md:mb-6 md:text-xl"
                }`}
                onClick={() => {
                  setValue(index);
                }}
              >
                {tab.company}
              </button>
            );
          })}
        </div>
        <div className="px-8">
          <h1 className="tracking-widest text-lg my-2">{title}</h1>
          <h2 className="my-2 bg-purple-400 inline-block px-2 py-1 rounded text-puple-500 font-bold">
            {company}
          </h2>
          <p className="text-purple-500 my-2">{dates}</p>
          {/* Jobs content */}
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc items-center gap-x-4 mt-5">
                <FaAngleDoubleRight className="text-purple-800" />
                <p>{duty}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center my-8 ">
        <button className="bg-purple-700 px-6 py-2 rounded text-purple-200 uppercase tracking-widest">
          More info
        </button>
      </div>
    </div>
  );
}
