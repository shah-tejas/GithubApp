import React, { useState } from 'react';
import './GithubApp.scss';
import MyPieChart from './MyPieChart';

const GithubApp = () => {
    const [username, setUsername] = useState("");
    const [languages, setLanguages] = useState([]);
    const [fetching, setFetching] = useState(false);

    const handleChange = (event) => {
        setUsername(event.target.value);
    }

    const fetchUserdetails = async () => {
        setFetching(true);
        const resp = await fetch(`https://api.github.com/users/${username}/repos`);
        const userRepositories = await resp.json();
        if(userRepositories) {
            const languageMap = new Map();
            userRepositories.forEach((repo) => {
                if(repo.language) {
                    if(languageMap.has(repo.language)) {
                        languageMap.set(repo.language, languageMap.get(repo.language)+1);
                    } else {
                        languageMap.set(repo.language, 1);
                    }
                }
            });
            setLanguages([]);
            const l = [];
            l.push(["Languages", "Count"]);
            languageMap.forEach((value, key) => {
                l.push([key, value]);
                
            });
            setLanguages(languages => l);
        }
        setFetching(false);
    }

    return (
        <div className="container">
            <h3>What language does User code in?</h3>
            <input 
                type="text"
                placeholder="Enter User's Github username"
                value={username}
                onChange={handleChange}
            />
            <button onClick={fetchUserdetails}>Fetch</button>
            <div>
                {languages.length > 0 && !fetching
                    && <MyPieChart languages={languages} /> }
            </div>
            
        </div>
    )
};

export default GithubApp;
