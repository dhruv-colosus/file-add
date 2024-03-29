import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="bg-zinc-950 font-main font-medium dark:bg-white h-[100vh] w-[100vw] flex justify-center align-middle text-center items-center flex-col">
        <h1 className="text-2xl text-pink-500  hover:underline cursor-pointer">
          <Link to="/upload">Upload</Link>
        </h1>
        <h1 className="text-2xl text-pink-500 hover:underline cursor-pointer ">
          <Link to="/files">Files</Link>
        </h1>
      </div>
    </>
  );
}

export default App;
