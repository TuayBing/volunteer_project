import React from "react";
import HeaderFooterLayout from "../../Layout/Header-Footer/HeaderFooterLayout";
import ContactForm from "./ContactForm";
import Contactimage from "./Contactimage";

function Contact() {
  return (
    <div>
      <HeaderFooterLayout>
        <div className="flex flex-col lg:flex-row w-full"> 
          <div className="w-full lg:w-1/2 flex items-center justify-center p-2 sm:py-4">
            <ContactForm />
          </div>

          <div className="w-full lg:w-1/2 hidden lg:flex items-center justify-center p-2">
            <Contactimage />
          </div>
        </div>
      </HeaderFooterLayout>
    </div>
  );
}

export default Contact;
