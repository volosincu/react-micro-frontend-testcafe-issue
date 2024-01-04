import React, { useState, useEffect } from "react";
import useAxios, { configure } from "axios-hooks";

// UNCOMMENT HERE to reproduce bug
// configure({ cache: false });

export const App = () => {
  const [feeds, setFeeds] = useState([]);

  const [{ data: feedsResults, error: errFeeds }, fetchNewsFeeds] = useAxios(
    {
      url: "http://localhost:7272/feeds/active",
      signal: AbortSignal.timeout(27000),
    },
    { manual: true }
  );

  useEffect(() => {
    if (feedsResults) {
      const feedsList = feedsResults.map((item) => {
        const text = item.text || "dummy-data";
        return {
          name: item.name,
          feedId: item.feedId,
          text,
        };
      });

      setFeeds(feedsList);
    } else {
      fetchNewsFeeds();
    }
  }, [feedsResults]);

  return (
    <div>
      <h3>Hello from the other side</h3>
      <ul>
        <pre>Fetch by axios-hooks: </pre>
        {feeds.map((feed) => (
          <li key={`frag${Math.random()}`}>
            <a id={`id-${feed.feedId}`} href="http://localhost:4000">
              {feed.name}
            </a>
          </li>
        ))}
      </ul>
      <button
        id="btn-clean"
        onClick={() => {
          setFeeds([]);
          console.log("click btn clean");
        }}
      >
        clean!
      </button>
      <button
        id="btn-refetch"
        onClick={() => {
          console.log("click btn refetch");

          if (feeds && feeds.length === 0) {
            console.log("no feeds - refetch");
            fetchNewsFeeds();
          }
        }}
      >
        Refetch!
      </button>
    </div>
  );
};
export default App;
