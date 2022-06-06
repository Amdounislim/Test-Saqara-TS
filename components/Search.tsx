import React,{useState} from "react";


interface SearchProps {
  filterPokemon: any

}

export default function Search({filterPokemon}:SearchProps) {

  const [searchInput, setSearchInput] = useState<string>("")

  const filterd:any=(e:React.SyntheticEvent)=>{
    e.preventDefault();
    filterPokemon(searchInput)
  }


  return (
    <form className="flex items-center mb-5">
      <label className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="voice-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos, Design Templates..."
          required
          onChange={(e)=>setSearchInput(e.target.value)}
        />
      </div>
      <button
        className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white  rounded-lg border bg-slate-500 hover:bg-slate-900 focus:ring-4 focus:outline-none "
        onClick={filterd}
      >
        <svg
          className="mr-2 -ml-1 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        Search
      </button>
    </form>
  );
}
