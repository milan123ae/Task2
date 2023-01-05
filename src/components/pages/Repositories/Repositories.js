import React, { useState, useEffect } from "react";
import "./Repositories.css";
import { Link, useParams } from "react-router-dom";
import axios from "../../../axios";

const Repositories = () => {

  const {  owner, login, name } = useParams();

  //RepositorieInformation
  const [repInfo, setRepInfo] = useState({});


  useEffect(() => {
    const fetchRepInformation = async () => {
      try {
        const response = await Promise.all([
          axios.get(`/repos/${owner[0]}/${name}`),
        ]);
        console.log(response);
        setRepInfo(response[0].data);

      } catch (error) {
        console.error(error);
      }
    };
    fetchRepInformation();
  }, []);

  return (
    <div className="container">
      <Link to="/" className="back">
        Back
      </Link>
      <div className="repositorie-information">
        <div className="image">
          <img src={repInfo.owner?.avatar_url} />
        </div>
        <div className="repositorie-content">
          <h3>ReposName{repInfo?.name}</h3>
          <p>Forks: {repInfo?.forks}</p>
          <p>Stars: {repInfo?.stargazers_count}</p>
          <div className="more-data">
          <p>Owner Name: {repInfo.owner?.login}</p>
            <p>Open Issues: {repInfo?.open_issues_count}</p>
            <p>Subscribers: {repInfo?.subscribers_count}</p>
            <p>Language: {repInfo?.language}</p>
            <p>
              <a className="x1" href={repInfo?.html_url}>View GitHub Profile</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repositories;
