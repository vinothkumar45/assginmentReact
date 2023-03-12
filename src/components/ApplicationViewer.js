import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

const ApplicationViewer = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(true)
  const [application, setApplication] = useState()

  useEffect(() => {
    const fetchApplication = async () => {
      const response = await fetch(`http://localhost:3001/application/${id}`)
      const application = await response.json()
      setLoading(false);
      setApplication(application);
    }
    fetchApplication()
  }, [])

  return (
    <div className="container">
      <Link to="/">Home</Link>
      <h1>Your Application</h1>
      {!loading && !application && (
        <p>No application found with id: {id}</p>
      )}
      {application && (
        <>
          <p><strong>{application.approved ? "Your application has been approved" : "Your application is pending approval"}</strong></p>
          <div>
            <p><strong>Id</strong></p>
            <p>{application.id}</p>
          </div>
          <div>
            <p><strong>Company name</strong></p>
            <p>{application.company_name}</p>
          </div>
          <div>
            <p><strong>Contact name</strong></p>
            <p>{application.contact_name}</p>
          </div>
          <div>
            <p><strong>Contact email</strong></p>
            <p>{application.contact_email}</p>
          </div>
          <div>
            <p><strong>Sponsorship level</strong></p>
            <p>{application.sponsorship_level}</p>
          </div>
          {application.comments && (
            <div>
              <p><strong>Tell us a little about your company</strong></p>
              <p>{application.comments}</p>
            </div>
          )}
          <div>
            <p><strong>Contact about future sponsorship opportunities</strong></p>
            <p>{application.contact_about_future_ops ? "Yes" : "No"}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default ApplicationViewer;
