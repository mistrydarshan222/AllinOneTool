import React, { useState } from 'react'


function Content({name}) {

    const [data,setData] = useState([]); 
    const [unqiuedata,setUnqiueData] = useState([]); 
    const [loading,setLoading] = useState(false);
  
    function webextractor(e){ 
        alert('web');  
        e.preventDefault();            
        const alldata = e.target.domain.value;
        const arrfinaldomain = alldata.match(/\bhttps?::\/\/\S+/gi);           
        console.log(arrfinaldomain);  
        setData(arrfinaldomain);
    }


    
    function emailextractor(e){
        alert('Email');
        e.preventDefault();            
        const emailalldata = e.target.domain.value;
        const emailfinaldomain = emailalldata.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);           
        console.log(emailfinaldomain);  
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
        if(loading){
                     
            console.log(data);
        }
    
function removeDuplicate(){
    setUnqiueData([...new Set(data)])
    console.warn(setData(unqiuedata));
    console.log("----------------");
    console.log(data);
}


//  domain Availibility checker


    return (
    <div>
        

            <h2 className='text-2xl text-black uppercase text-center mt-5'>
                {name} Extractor
            </h2>
      
            <form onSubmit=  {

                name==="web" && webextractor ||
                name==="email" && emailextractor ||
                name==="url2domain" && url2domain 

             } className='flex flex-col items-center m-auto'>
                <textarea class="form-control m-10 w-[80%] p-2 border-black border-2"
                type="text"
                name="domain"
                id="domain"
                rows="7"                                
                placeholder="paste text here...">                
                </textarea>
                <input type="submit" value="Submit" class="bg-blue-800 p-3 text-white" />
            </form>  


             <button name='removeDuplicate' onClick={removeDuplicate}>removeDuplicate</button>
           
        
            {/* <table className="fl-table mt-10 mb-10 w-[50%]">
                <thead>
                    <h2>Extracted {name} Data </h2>
                    <tr>
                        <th>{name}</th>                    
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Content 1</td>
                    </tr>        
                </tbody>
            </table>  */}
                  
        
    </div>
    
  )
}

export default Content;
