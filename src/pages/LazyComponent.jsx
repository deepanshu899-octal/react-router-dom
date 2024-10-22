import React from 'react';
import LazyLoad from 'react-lazy-load';

export default function LazyComponent() {
  return (
    <div style={{height:'3000px'}}>
      {
        new Array(5).fill(1).map((element,index)=>{
            return(
                 <LazyLoad 
                 height={762} width={400}
                 threshold={0.1} 
                 key={index}
                //  onContentVisible={() => {console.log('loaded!')}}
                 >
                <Hello index={index}/>
                 </LazyLoad>
            )
        })
      }
      <Hello index={6}/>
    </div>
  )
}

function Hello({index}){
    console.log('hello world loaded', index)
    return (
        <div style={{height:'300px'}}>
        <h1>Hello</h1>
       </div>
    )
}
