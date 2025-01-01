import React from 'react';

const Banner = () => {
 return (
   <div className="w-full mt-12 h-[525px] overflow-hidden">
     <div className="mx-auto max-w-[1400px]">
       <img
         src="/banner.png" 
         alt="Volunteer for Change"
         className="w-full h-full object-cover rounded-[30px]"
       />
     </div>
   </div>
 );
};

export default Banner;