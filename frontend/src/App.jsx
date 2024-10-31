import { useEffect, useState } from 'react';
import axios from "axios";


function App() {
  const [url, setUrl] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [shortedUrl, setShortedUrl] = useState(undefined);
  const [analytics, setAnalytics] = useState(undefined);
  const [shortID,setShortID] = useState("");

  const urlInputChangeHandler = (e) => {
    const inputData = e.target.value;
    setUrl(() => inputData);
  }

  const submitButtonHandler = (e) => {
    setButtonClicked(true);
  }

  const URL = 'http://localhost:8080/url';
  useEffect(() => {
    if (buttonClicked) {
      axios.post(URL, { url })
        .then((res) => {
          if (res.data.success) {
            setShortID(res.data.newUrl.shortId);
            console.log(shortID);
            let formattedUrl = URL + "/" + shortID;
            setShortedUrl(formattedUrl);
          } else {
            alert(res.data.msg); // Alert the error message for easier debugging
          }
        })
        .catch((error) => {
          console.error("Error in response:", error);
        });

      setButtonClicked(false);
    }
  }, [buttonClicked]);

  const getAnalytics = async () => {
    console.log(shortID);
    let analyticsURL = URL + '/analytics/' + shortID;
    const res = await axios.get(analyticsURL);
    setAnalytics(res.data.urlVisitedCount);
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen w-screen'>


        <div className='block min-w-sm p-6 bg-slate-300 border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 '>

          <h2 className='text-center text-3xl mb-12 font-bold text-gray-600'>Paste the URL to be shortened</h2>
          <div className='flex justify-between gap-4'>
            <input value={url} onChange={urlInputChangeHandler} type="text" id="shorturl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Url" required />
            <button onClick={submitButtonHandler} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Shorten</button>
          </div>


          {/* Shorted Url */}
          {shortedUrl &&
            <div className='my-10'>
              <p>Your Short Url : <a href={shortedUrl} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>{shortedUrl}</a></p>
              <button onClick={getAnalytics} className='mt-10 cursor-pointer text-white text-lg font-bold p-3 bg-slate-500 rounded-md'>Show Analytics</button>
              {analytics &&
                <span className='ml-32 text-gray-700 font-bold text-lg'>{analytics} Clicks</span>
              }
            </div>
          }

        </div>


      </div>
    </>
  )
}

export default App
