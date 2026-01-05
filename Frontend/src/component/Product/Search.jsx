import { useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

function Search() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  let handleSubmit = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <MetaData title="Search A Product" />
      <form action="" className="searchBox" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a product ..."
          value={keyword.name}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </>
  );
}

export default Search;
