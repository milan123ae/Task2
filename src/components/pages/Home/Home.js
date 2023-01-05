import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "../../../axios";
import Repositories from "../../ui/Repositories";
const Home = () => {
  let [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState([]);
  //Repositories fetched from the API
  //Page
  const [page, setPage] = useState(1);
  //Per page
  const [limit, setLimit] = useState(10);

  const [isChecked, setIsChecked] = useState(false)

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };
  const handlePrevPage = () => {
    setPage((page) => {
      if (page === 1) return page;
      else return page - 1;
    });
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const handlePageLimit = (e) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  const fetchRepositories = async () => {
    try {
      const { data } = await axios.get("/search/repositories?q=" + query, {
        params: {
          page,
          per_page: limit,
        },
      });
     // console.log(data);
      return data?.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSearchRepositories = async (e) => {
    e.preventDefault();
    if(isChecked === false){
      query = 'Angular';
      setQuery(query);
    } else{
      query = 'angular+in:repos&sort=stars&sort=forks&order=asc';
      setQuery(query);
    }
      const items = await fetchRepositories();
      setRepositories(items);

  };

  const handleSearchRepositories1 = async (e) => {
    e.preventDefault();
    if(isChecked === false){
      query = 'React';
      setQuery(query);
    } else{
      query = 'react+in:repos&sort=stars&sort=forks&order=asc';
      setQuery(query);
    }
      const items = await fetchRepositories();
      setRepositories(items);

  };

  const handleSearchRepositories2 = async (e) => {
    e.preventDefault();
    if(isChecked === false){
      query = 'Vue';
      setQuery(query);
    } else{
      query = 'vue+in:repos&sort=stars&sort=forks&order=asc';
      setQuery(query);
    }
      const items = await fetchRepositories();
      setRepositories(items);

  };

  const handleOnChange1 = () => {
    setIsChecked(!isChecked);
    //console.log(isChecked);
  };
  useEffect(() => {
    const displayRepositoriesOnChange = async () => {
      if (query) {
        const items = await fetchRepositories();
        setRepositories(items);
      }
    };
    displayRepositoriesOnChange();
  }, [page, limit]);
 // console.log(repositories);

  return (
    <div className="container">
      <div className="search-form">
        <form>
          <div>
           <button onClick={handleSearchRepositories1}>React</button>
           <button onClick={handleSearchRepositories}>Angular</button>
           <button onClick={handleSearchRepositories2}>Vue</button>
           </div>
           <div>
           <label className="labela" > Sort</label> 
           <input type="checkbox" checked={isChecked} onChange={handleOnChange1}/>
           </div>
        </form>
      </div>
      <div className="search-results">
        <div className="more-options">
          <label>
            <small>Per Page</small>
            <select onChange={handlePageLimit}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
          <div className="pagination">
            <button onClick={handlePrevPage}>{page}</button>
            <button onClick={handleNextPage}>{page + 1}</button>
          </div>
        </div>
        {repositories ? (
          repositories.map((rep) => {
            return <Repositories rep={rep} key={rep.id} />;
          })
        ) : (
          <h2>There is nothing to display...</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
