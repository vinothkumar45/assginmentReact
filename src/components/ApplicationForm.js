import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./application.css";
const ApplicationForm = () => {
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

//-------------------------------------------------------------------------\



const initialValues =
 { companyName: "", 
   contactName: "", 
   contactEmail: "",
   sponsorshipLevel:"gold", 
   comments:"",
  contactAboutFutureOps:true
};

const [formValues, setFormValues] = useState(initialValues);
const [formErrors, setFormErrors] = useState({});
const [isSubmit,setIsSubmit]=useState(false);

useEffect(() => {
        const postData=async()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
            const application = {
                company_name: formValues.companyName,
                contact_name:formValues.contactName,
                contact_email: formValues.contactEmail,
                sponsorship_level:formValues.sponsorshipLevel,
                comments:formValues.comments,
                contact_about_future_ops:formValues.contactAboutFutureOps
              }
            const response = await fetch("http://localhost:3001/application", {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(application)
              })
              const data = await response.json()
              if (data) {
                navigate(`/apps/${data.id}`)
              } 
         }
              
    }
    postData();
    
  }, [formErrors]);
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
  };

   const [checked, setChecked] = React.useState(true);

  const handleCheckChange = () => {
    setChecked(!checked);
    setFormValues({ ...formValues,contactAboutFutureOps:!checked });
  };


  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.companyName) {
      errors.companyName = "companyName is required!";
    }
    if (!values.comments) {
        errors.comments = "comments is required!";
      }
      if (!values.contactName) {
        errors.contactName = "contactName is required!";
      }
    if (!values.contactEmail) {
      errors.contactEmail = "Email is required!";
    } else if (!regex.test(values.contactEmail)) {
      errors.contactEmail = "This is not a valid email format!";
    }
  
    return errors;
  };

///-----------------------------------------------------
  const submitApplication = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);   
  }

  return (

    <div className="container">
        {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
      <Link to="/">Home</Link>
      <h1>Apply to Sponsor</h1>
      <form onSubmit={submitApplication} >
        <div>
          <label htmlFor="companyName">Company name</label>
          <input type="text"
                 id="companyName"
                 name="companyName"
                 value={formValues.companyName}
                 onChange={handleChange}
          />
          {formErrors.companyName && <span><i>{formErrors.companyName}</i></span>}
        </div>
        <div>
          <label htmlFor="contactName">Contact name</label>
          <input type="text"
                 id="contactName"
                 name="contactName"
                 value={formValues.contactName}
                 onChange={handleChange}
          />
          {formErrors.contactName && <span><i>{formErrors.contactName}</i></span>}
        </div>
        <div>
          <label htmlFor="contactEmail">Contact email</label>
          <input type="text"
                 id="contactEmail"
                 name="contactEmail"
                 value={formValues.contactEmail}
                 onChange={handleChange}
          />
          {formErrors.contactEmail && <span><i>{formErrors.contactEmail}</i></span>}
        </div>
        <div>
          <label htmlFor="sponsorshipLevel">Sponsorship level</label>
          <select id="sponsorshipLevel"
                  name="sponsorshipLevel"
                  value={formValues.sponsorshipLevel}
                  onChange={handleChange}
          >
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="bronze">Bronze</option>
          </select>
          {errors.sponsorship_level && <span><i>{errors.sponsorship_level}</i></span>}
        </div>
        <div>
          <label htmlFor="comments">Tell us a little about your company</label>
          <textarea id="comments"
                    name="comments"
                    value={formValues.comments}
                    onChange={handleChange}
          />
           {formErrors.comments && <span><i>{formErrors.comments}</i></span>}
        </div>
        <div>
          <label htmlFor="contactAboutFutureOps">
            <input type="checkbox"
                   id="contactAboutFutureOps"
                   name="contactAboutFutureOps"
                   value={formValues.contactAboutFutureOps}
                   onChange={handleCheckChange}
                   checked={checked}
                  
         
                  

            />
            Contact about future sponsorship opportunities
          </label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default ApplicationForm;
