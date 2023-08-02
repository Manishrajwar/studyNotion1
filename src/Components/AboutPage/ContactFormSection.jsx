import ContactUsForm from "../Common/ContactUsForm";

function  ContactFormSection(){
    return (
        <div className="mx-auto max-w-maxContent w-11/12 text-center mt-40">
             <h1 className="text-3xl font-bold  ">Get in Touch</h1>
             <p className="text-richblack-300">We’d love to here for you, Please fill out this form.</p>

             <div className="flex items-center justify-center mt-10">
                <ContactUsForm />
             </div>
        </div>
    )
}

export default ContactFormSection;