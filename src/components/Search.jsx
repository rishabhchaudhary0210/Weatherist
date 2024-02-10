/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import './Stylesheets/Search.css';

const Search = (props) => {
    const [searchResult, setSearchResult] = useState("");
    const [searchParam, setSearchParam] = useState("");
    const [listClick, setListClick] = useState(false);
    const [showRecentSearch, setShowRecent] = useState(false);
    const [recentResult, setRecentResult] = useState([]);

    useEffect(() => {
        const getApiData = setTimeout(async () => {
            //checking if search param is valid 
            if (!listClick && typeof(searchParam) === "string" &&searchParam.length > 0 && searchParam.match("^[a-zA-Z\d]+(?: [A-Za-z\d]{2,})*$")) {
                try {
                    console.log("ApiKey = ", import.meta.meta.env.VITE_API_KEY)
                    //getting search response
                    const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_API_KEY}&q=${searchParam}`);
                    const data = await response.json();
                    // console.log(data);
                    setSearchResult(data);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }, 500)
        //debouncing 
        return () => clearTimeout(getApiData)
    }, [searchParam]);

    const AddRecentSearch = (val) => {
        let recent = localStorage.getItem("recent");
        if (recent === null) {
            recent = [];
        }
        else {
            recent = recent.split(",");
        }
        if (!recent.includes(val)) {
            recent.push(val);
        }
        if (recent.length > 5) {
            recent.shift();
        }
        localStorage.setItem("recent", recent);
        // console.log(recent);
    }

    const HandleListClick = (val) => {
        //setting search param for uplifted city
        props.setCity(val);
        //list click so multiple request does not go
        setListClick(true);
        //display clicked value to user
        setSearchParam(val);
        //hide recents also
        setShowRecent(false);
        //adding to recent searches
        AddRecentSearch(val);
    }
    const HandleInputChange = (e) => {
        // handling change of input and displaying list of result matching
        setListClick(false);
        setSearchResult("");
        setSearchParam(e.target.value.toString());
    }
    const HandleRecentToggle = () => {
        console.log("CLicked");
        if (!showRecentSearch) {
            const data = localStorage.getItem("recent").split(",");
            if (!data || data.length === 0) {
                setRecentResult(["No recent searches found"]);
            }
            else {
                setRecentResult(data);
            }
            console.log(data);
            setShowRecent(true);
        }
        else {
            setShowRecent(false);
        }
    }
    return (
        <div className="search-wrapper">
            <div className="input-container">
                <input type="text"
                    value={searchParam}
                    placeholder="Enter your city name"
                    onChange={(e) => HandleInputChange(e)} />
                <IconClockRotateLeft className="recent-icon" 
                onClick={HandleRecentToggle}
                />
                <IconSearch className="search-icon" />
            </div>
            {
                showRecentSearch && recentResult?.length > 0 &&
                <div className="recent-result-wrapper">
                    <h2>Recents</h2>
                    {
                        recentResult?.map((ele, index) =>
                            <div key={index + 'r'} className="list-item"
                            onClick={()=>HandleListClick(ele)}>
                                <h3>{ele}</h3>
                            </div>
                        )
                    }
                </div>
            }
            {
                typeof (searchResult) === 'object' && searchParam.length > 0 && !listClick &&
                <div className="search-result-wrapper">
                    {
                        searchResult?.length > 0 ?
                            <div className="search-result-container">
                                {
                                    searchResult?.map((ele, index) =>
                                        <div key={index}
                                            className="list-item"
                                            onClick={() => HandleListClick(ele?.name)} >
                                            <h3>{ele?.name}</h3>
                                            <h4>{ele?.region} {ele?.region ? ", " : ""} {ele?.country} </h4>
                                        </div>
                                    )
                                }
                            </div>
                            :
                            <div className="search-result-container">
                                <h4>Sorry, no results found.
                                    <span>Try entering complete city name.</span>
                                </h4>
                            </div>
                    }
                </div>
            }
        </div>
    )
}

export default Search

function IconSearch(props) {
    return (
        <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
        </svg>
    );
}

function IconClockRotateLeft(props) {
    return (
        <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M8 3a5 5 0 11-4.546 2.914.5.5 0 00-.908-.417A6 6 0 108 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 00-.41-.192L5.23 2.308a.25.25 0 000 .384l2.36 1.966A.25.25 0 008 4.466z" />
        </svg>
    );
}