import { Button } from "@mui/material";
import React, { useState, useEffect ,webView} from "react";
import { useNavigate } from "react-router";




const ContactUs = () => {
  const navigate = useNavigate();

    useEffect(()=>{
      
      //  window.location.href = 'https:\\goftino.com/c/fHDXxR';
      //  window.open('https:\\goftino.com/c/LJIDzy', '_blank', 'noreferrer')

     window.open('https://goftino.com/c/LJIDzy', '_blank');
      //  navigate(-1);
     // window.open('https:\\goftino.com/c/fHDXxR'); 
    },[])

  return (
    <div className="m-0 p-3 d-flex flex-column justify-content-center align-items-center w-100 h-100">



    


      {/* <div> */}
      {/* <h1
        style={{
          lineHeight: "1.5",
        }}
        className="fs-5 text-center"
      >
        برای ارتباط با پشتیبانی فنی لرنست در واتساپ و گزارش مشکلات فنی لینک زیر
        را کلیک کنید .{" "}
      </h1> */}
     {/* {'https:\\goftino.com/c/fHDXxR'} */}
      {/* <Button
        className="mt-4"
        variant="contained"
        color="primary"
        href="https://wa.me/989374583089"
        LinkComponent={(props) => (
          <a
            href={"https://wa.me/989374583089"}
            {...props}
            className={props?.className + " text-white"}
          />
        )}
      >
        اتصال به واتساپ پشتیبانی
      </Button> */}
      {/* </div> */}
   

    </div>
  );
};

export default ContactUs;
