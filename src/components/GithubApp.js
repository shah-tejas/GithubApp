import React, { useState } from 'react';
import './GithubApp.scss';
import MyPieChart from './MyPieChart';
import Button from '@material-ui/core/Button';
import Avatar from './Avatar';

const GithubApp = () => {
    const [username, setUsername] = useState("");
    const [languages, setLanguages] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [errormsg, setErrormsg] = useState("");
    const [userfullname, setUserfullname] = useState("");
    const [avatarsrc, setAvatarsrc] = useState("");

    const myHeaders = new Headers();
    const authHeader = "Basic " + btoa(process.env.REACT_APP_GITHUB_CLIENT_ID + ":" + process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    myHeaders.append("Authorization", authHeader);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const handleChange = (event) => {
        setUsername(event.target.value);
    }

    const fetchUser = async () => {
        setFetching(true);
        const resp = await fetch(`https://api.github.com/users/${username}`, requestOptions);
        const user = await resp.json();
        if(user) { 
            setUserfullname(user.name);
            setAvatarsrc(user.avatar_url);
        } else {
            setErrormsg("Not a valid user");
        }

        fetchUserdetails();
        setFetching(false);
    }

    const fetchUserdetails = async () => {
        setFetching(true);
        const resp = await fetch(`https://api.github.com/users/${username}/repos`, requestOptions);
        const userRepositories = await resp.json();
        if(userRepositories && userRepositories.length > 0) {
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
        } else {
            setErrormsg("Not a valid user");
        }
        setFetching(false);
    }

    return (
        <div className="container">
            <h3>What language does User code in?</h3>
            <p>(based on user's contributions to public Github repositories)</p>
            <input 
                type="text"
                placeholder="Enter User's Github username"
                value={username}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={fetchUser}
            >
                Fetch
            </Button>
            <div>
                {errormsg}
            </div>
            <div>
                {languages.length > 0 && !fetching
                    &&
                    <div>
                        {
                            avatarsrc &&
                            <Avatar src={avatarsrc} />
                        }
                        <MyPieChart languages={languages} userfullname={userfullname} />
                    </div>    
                }
            </div>
            
        </div>
    )
};

export default GithubApp;
