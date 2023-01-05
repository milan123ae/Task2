import React from "react";
import { Link } from "react-router-dom";
const Repositories = ({ rep }) => {
  const {name, owner, forks, stargazers_count, id } = rep;
  console.log(rep);
  return (
    <div className="repositorie">
      <div className="image">

      </div>
      <div className="repositorie-info">
      <div className="image">
        <img src={owner.avatar_url} alt={owner.login} />
      </div>
        <h3>Repos: {name}</h3>
        <h3>Name: {owner.login}</h3>
        <p>Forks: {forks}</p>
        <p>Stars: {stargazers_count}</p>
        <Link to={`/repositories/${name}/${owner.login}`}>View repositorie</Link>
      </div>
    </div>
  );
};

export default Repositories;
