import React, { useEffect, useRef } from "react";

const Search = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        return;
      } else {
        if (e.key === "/") {
          e.preventDefault();
          // setSearchState(true);
          inputRef.current.focus();
        }
      }
    });
    return () =>
      window.removeEventListener(
        "keydown",
        () => {
          console.log("exit");
        },
        false
      );
  }, []);

  return (
    <div className="boxShadow rounded-3xl p-4 border border-border flex gap-4">
      <input
        type="text"
        ref={inputRef}
        placeholder="Type to begin search, or use the global shortcut"
        className="w-full secondary-input rounded-2xl py-3 text-lg border border-border bg-whiteColor"
      />
      <div className="flex gap-4">
        <button
          disabled
          className="rounded-2xl outline-none bg-whiteColor border border-border px-6 font-black text-textcolor"
        >
          /
        </button>
      </div>
    </div>
  );
};

export default Search;
