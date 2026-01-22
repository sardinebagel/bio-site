import '../styles/expired.css'

function Expired() {
  return (
    <div className="expired-container">
      <div className="expired-content">
        <div className="expired-icon">🔗</div>
        <h1>Link Expired or Invalid</h1>
        <p>
          This link is no longer active. It may have expired or been revoked.
        </p>
        <div className="expired-contact">
          <p>If you believe this is an error, please contact me directly:</p>
          <a href="mailto:cameron@cameronjim.com" className="btn btn-primary">
            Send Email
          </a>
        </div>
      </div>
    </div>
  )
}

export default Expired
