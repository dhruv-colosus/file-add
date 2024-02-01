import { useState, useEffect } from "react";
const Display = () => {
  const [data, setData] = useState<FileData[]>([]);
  interface FileData {
    name: string;
    realname: string;
    // Add other properties if they exist in your data
  }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://20.89.176.39:8000/api/files`);
        const result = await response.json();

        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleClick = async (realname: string) => {
    try {
      window.open(`http://20.89.176.39:8000/api/files/${realname}`);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  return (
    <div className="bg-zinc-950 font-main font-medium dark:bg-white h-[100vh] w-[100vw] flex justify-center align-middle text-center items-center flex-col">
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="text-pink-500 ">
            {data.map((e) => (
              <li
                className="cursor-pointer hover:underline"
                onClick={() => handleClick(e.realname)}
                key={e.realname}
              >
                {e.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Display;
