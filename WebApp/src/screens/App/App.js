import { useEffect, useState } from "react";
import "./App.css";
import leaderboard from "../../assets/leaderboard.json";
import { search, sort } from "../../helpers/functions";

function App() {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);
  const [searchtext, setsearchtext] = useState("");
  const [errorshow, seterrorshow] = useState(null);

  const fetchData = async () => {
    let leaderboardData = Object.values(leaderboard);
    let sortedData = await sort(leaderboardData);
    setdata(sortedData.slice(0, 10));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchUser = async () => {
    if (searchtext !== "") {
      setloading(true);
      let leaderboardData = Object.values(leaderboard);
      let sortedData = await sort(leaderboardData);
      let { searchedData, error, errorText } = await search(sortedData, searchtext);
      setdata(searchedData);
      if (error) {
        seterrorshow(errorText);
        setTimeout(() => {
          seterrorshow(null);
        }, 3000);
      } else {
        seterrorshow(null);
      }
      setloading(false);
    } else {
      seterrorshow('Type user name to search...');
        setTimeout(() => {
          seterrorshow(null);
        }, 3000);
    }
  };

  const renderLoading = () => {
    return (
      <div className="flex-1 justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex-row items-center bg-white px-4 rounded-md">
        <div>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-100 rounded-lg"
              placeholder="Search..."
              value={searchtext}
              onChange={(e) => setsearchtext(e.target.value)}
              required
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={() => searchUser()}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderErrorToast = () => {
    return (
      <div
        id="toast-danger"
        class="absolute z-999 drop-shadow-2xl right-5 bottom-5 flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Error icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">{errorshow}</div>
        <button
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-danger"
          aria-label="Close"
        >
          <span class="sr-only">Close</span>
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="flex-1 p-4">
      {renderHeader()}
      <div className="flex-1 p-2 py-10">
        {loading ? (
          renderLoading()
        ) : (
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  Name
                </th>
                <th scope="col" class="py-3 px-6">
                  Rank
                </th>
                <th scope="col" class="py-3 px-6">
                  Number of Bananas
                </th>
                <th scope="col" class="py-3 px-6">
                  isSearchedUser?
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((usr, usrIndex) => {
                  let isSearchedUser =
                    usr.isSearchedUser && usr.isSearchedUser === true;
                  return (
                    <tr
                      class={`bg-white border-b ${
                        isSearchedUser ? "text-red-500 font-bold" : ""
                      }`}
                    >
                      <th
                        scope="row"
                        class="py-4 px-6 whitespace-nowrap dark:text-white"
                      >
                        {usr.name}
                      </th>
                      <td class="py-4 px-6">
                        {usr.rank ? usr.rank + 1 : usrIndex + 1}
                      </td>
                      <td class="py-4 px-6">{usr.bananas}</td>
                      <td class="py-4 px-6">
                        {isSearchedUser ? "True" : "False"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      {errorshow !== null ? renderErrorToast() : null}
    </div>
  );
}

export default App;
