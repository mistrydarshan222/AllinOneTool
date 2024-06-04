import React, { useState , useEffect } from 'react';
import psl from 'psl';
import env from "react-dotenv";

import { isDisabled } from '@testing-library/user-event/dist/utils';


function Content({name}) {

    const [data,setData] = useState([]); 
    const [unqiuedata,setUnqiueData] = useState([]); 
    const [loading,setLoading] = useState(false);
    const [isLoading, setisLoading] = useState(false);  
    const [domain, setDomain] = useState([]);
    const [process, setProcess] = useState(false);


    useEffect(()=>{

const allinput = document.querySelectorAll('textarea');
allinput.forEach(element => {
    element.value = "";
});
setData([]);
    },[name]);
  
    function webextractor(e){         
        e.preventDefault();            
        const alldata = e.target.domain.value;    
        const arrfinaldomain = alldata.match(/(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/g); 
        console.log(alldata);
        setData(arrfinaldomain);
    }

    function emailextractor(e){        
        e.preventDefault();            
        const emailalldata = e.target.domain.value;
        const emailfinaldomain = emailalldata.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);           
        setData(emailfinaldomain);
    }

    function domain_from_url(url) {
        var result
        var match
        if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
            result = match[1]
            if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
                result = match[1]
            }
        }
        return result
    }

    function url2domain(e){
        setLoading(false);
        setData([]);
        e.preventDefault(); 
      
        const urlstring = e.target.domain.value;    
        
        const urlarray = urlstring.replace(/\r\n/g,"\n").split("\n");        
        const splitarray = urlarray.filter(e => String(e).trim());
        
        splitarray.map((singleurl) => {
            domain_from_url(singleurl)
            setData((data)=> [...data, domain_from_url(singleurl)]);
            // setData([...new Set(data)]);           
        })

        setLoading(true);

        
    }    
    if(loading)
    {                     
            console.log(data);
    }
    
    function removeDuplicate(){   
    setData([...new Set(data)]);    
    }




    //  domain Availibility checker
  
    useEffect(()=>{
        console.log("use effect called")
    },[domain])  
  
  async function expireddomain(e){
    setDomain([]);
    e.preventDefault();    
    const spilltedArray = e.target.domain.value.split('\n');
    const RemovedSpace = spilltedArray.filter(function(entry) { return entry.trim() != ''; });
    const arraydomain = [...new Set(RemovedSpace)];
    
    let cursor = 0;
    const timeout = 1000;
    const sleep = (ms) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    const loop = async () => {
    const CurrentArray = arraydomain[cursor];    
        // Break if index is out of bounds
        if (!CurrentArray) {
        setProcess(false);
        setisLoading(true);  
        console.warn(data);      
        return console.log('Domain Scrapped');               
    }

        var parsed =  psl.parse(CurrentArray);
        if(parsed.domain){ 
        setProcess(true);
        await fetch(`${env.API_URL}?domain=${parsed.domain}`)        
        .then((response) => response.json())
        .then(( data) =>{
        if( data.status===200){
            
            setData(data => [...data, parsed.domain]);
        }
    
        setisLoading(true);         
        })
        .then(async (nominatimData) => {
            // ....do something...
            // Proceed to the next element in the array
            cursor++;
            await loop();

        }).catch(async (e) => {
            console.log(`Failed, retrying in ${ timeout }ms`);
            await sleep(timeout);
            await loop(); // Retry the loop with the same cursor index
        });
        }
        else{
            cursor++;
            await loop();
        }
        };
        await loop();
        }

        function myform2handle(e){
            expireddomain(e);
        }
        function copybtn() {
            const formattedDomain = data.join('\r\n');             
                navigator.clipboard.writeText(formattedDomain).then(() => {
              console.log(":done");
            }, () => {                                          
              /* clipboard write failed */
            });
          }
    return (
        
    <div>
        

            <h2 className='text-2xl text-black uppercase text-center mt-5'>
                {name} Extractor
            </h2>
           
      
            <form onSubmit=  {
                name==="web" && webextractor ||
                name==="email" && emailextractor ||
                name==="url2domain" && url2domain ||
                name==="expireddomain" && expireddomain 
             } className='flex flex-col items-center m-auto'>
                <textarea className="form-control m-10 w-[80%] p-2 border-black border-2"
                type="text"
                name="domain"
                id="domain"
                rows="7"                               
                placeholder="paste text here...">                
                </textarea>
                
                <button 
                
                type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-purple-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150" disabled={ (process) ? true : false }>

                {(process) ?
                   <div className='flex'>
                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Processing
                   </div>
               
                    :"Submit" }
                    </button>
                
            </form>  

             <div className='flex flex-col items-center mt-2'>
             <button name='removeDuplicate' onClick={removeDuplicate} className="bg-blue-600 rounded-lg	 text-white p-3">removeDuplicate</button>
             <button name='copybtn' onClick={copybtn} className="bg-red-600 rounded-lg	 text-white p-3 mt-2">Copy</button>
             </div>
            
        
             <h2 className='text-xl text-center text-blue-600 my-2 uppercase'>Extracted {name} Data </h2>
            {(data) ? 
        
            <table className="fl-table mt-10 mb-10 w-[80%] m-auto">
                <thead>
                    <tr>
                        <th className='text-lg text-center text-white uppercase rounded-[10px] p-1'>{name}</th>                    
                    </tr>
                </thead>
                
                <tbody>
                {
                data.map((finaldata, index) => (
                <tr key={index}>                        
                    <td className='text-lg text-center text-white uppercase rounded-[10px] p-1'>{finaldata}</td>
                </tr>
                ))}
                            
                </tbody>
            </table> 
            : "" }
                    
    </div>
    
  )
}

export default Content;
