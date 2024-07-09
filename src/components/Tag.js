import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';

const API_KEY = 'WIqIbUGzPFIbmNYJkLYgivXbLE8Lko08';
const Tag = () => {
    const[tag, setTag]=useState('car');
    const [gif, setGif] = useState('');
    const [loading, setLoading] = useState('false');

    async function fetechData() {
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
        try {
            setLoading(true);
            let res = await fetch(url);
            let ans = await res.json();
            const imgsrc = ans.data.images.downsized_large.url;
            // console.log(imgsrc);
            setGif(imgsrc);
            setLoading(false);
        }
        catch (error) {
            console.log("error");
        }
    }
    useEffect(() => {
        fetechData();
    }, [])
    function clickhandler() {
        fetechData();
    }
    function changehandler(event){
       setTag(event.target.value);
    }
    return (
        <div className='w-1/2  bg-blue-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]'>
            <h1 className='mt-[15px] text-2xl underline uppercase font-bold'>Random {tag} Gif</h1>

            {
                loading ? (<Spinner />) : (<img src={gif} width="450px" />)
            }
             
            <input 
                value={tag}
                onChange={changehandler}
                className='w-10/12 text-lg py-2 rounded-lg text-center mb-[2px]'
            />

            <button className='w-10/12 bg-yellow-300 text-lg py-2 rounded-lg mb-[20px]' onClick={clickhandler}>Generate</button>
        </div>
    )
}

export default Tag
