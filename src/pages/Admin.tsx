import { useState, useEffect } from 'react'
import '../styles/admin.css'

const API_BASE = 'https://api.cameronjim.com'

interface Token {
  token: string
  campaign: string
  shortLink: string
  createdAt: string
  expiresAt: number
}

interface Event {
  token: string
  timestamp: string
  type: string
  campaign?: string
  ipHash?: string
  userAgent?: string
}

interface AnalyticsItemProps {
  token: Token
  accessCount: number
  lastAccessed: string | null
  events: Event[]
  formatDate: (dateStr: string | number) => string
}

function AnalyticsItem({ token, accessCount, lastAccessed, events, formatDate }: AnalyticsItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="analytics-item">
      <div 
        className="analytics-item-header" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="analytics-item-info">
          <strong>{token.campaign}</strong>
          <span className="token-code">{token.token}</span>
        </div>
        <div className="analytics-item-stats">
          <span className="access-count">
            {accessCount} {accessCount === 1 ? 'view' : 'views'}
          </span>
          {lastAccessed && (
            <span className="last-accessed">
              Last: {formatDate(lastAccessed)}
            </span>
          )}
          {!lastAccessed && (
            <span className="no-views">No views yet</span>
          )}
        </div>
        <button className="expand-btn">
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="analytics-item-details">
          {events.length === 0 ? (
            <p className="no-events">No activity recorded for this link yet.</p>
          ) : (
            <div className="event-timeline">
              <h4>Access History ({events.length})</h4>
              {events.map((event, index) => (
                <div key={index} className="timeline-event">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-type">{event.type}</span>
                    <span className="timeline-time">{formatDate(event.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Admin() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [tokens, setTokens] = useState<Token[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [activeTab, setActiveTab] = useState<'tokens' | 'events'>('tokens')
  
  // New token form
  const [newCampaign, setNewCampaign] = useState('')
  const [newDays, setNewDays] = useState(30)
  const [createdToken, setCreatedToken] = useState<Token | null>(null)

  // Check if already logged in (stored in sessionStorage)
  useEffect(() => {
    const storedPassword = sessionStorage.getItem('adminPassword')
    if (storedPassword) {
      setPassword(storedPassword)
      verifyPassword(storedPassword)
    }
  }, [])

  async function verifyPassword(pwd: string) {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch(`${API_BASE}/admin/verify`, {
        headers: { 'Authorization': `Bearer ${pwd}` }
      })
      
      if (response.ok) {
        setIsAuthenticated(true)
        sessionStorage.setItem('adminPassword', pwd)
        loadTokens(pwd)
        loadEvents(pwd)
      } else {
        setError('Invalid password')
        sessionStorage.removeItem('adminPassword')
      }
    } catch (err) {
      setError('Connection error')
    }
    
    setIsLoading(false)
  }

  async function loadTokens(pwd: string) {
    try {
      const response = await fetch(`${API_BASE}/admin/tokens`, {
        headers: { 'Authorization': `Bearer ${pwd}` }
      })
      const data = await response.json()
      setTokens(data.tokens || [])
    } catch (err) {
      console.error('Failed to load tokens:', err)
    }
  }

  async function loadEvents(pwd: string) {
    try {
      const response = await fetch(`${API_BASE}/admin/events`, {
        headers: { 'Authorization': `Bearer ${pwd}` }
      })
      const data = await response.json()
      setEvents(data.events || [])
    } catch (err) {
      console.error('Failed to load events:', err)
    }
  }

  async function createToken(e: React.FormEvent) {
    e.preventDefault()
    if (!newCampaign.trim()) return
    
    setIsLoading(true)
    setCreatedToken(null)
    
    try {
      const response = await fetch(`${API_BASE}/admin/tokens`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${password}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          campaign: newCampaign.trim(),
          days: newDays
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        setCreatedToken(data)
        setNewCampaign('')
        loadTokens(password)
      } else {
        setError('Failed to create token')
      }
    } catch (err) {
      setError('Connection error')
    }
    
    setIsLoading(false)
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
  }

  function formatDate(dateStr: string | number) {
    const date = typeof dateStr === 'number' 
      ? new Date(dateStr * 1000) 
      : new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  function logout() {
    sessionStorage.removeItem('adminPassword')
    setIsAuthenticated(false)
    setPassword('')
    setTokens([])
    setEvents([])
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-card">
          <h1>Admin Dashboard</h1>
          <p>Enter your admin password to continue</p>
          
          <form onSubmit={(e) => { e.preventDefault(); verifyPassword(password); }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
            />
            <button type="submit" disabled={isLoading || !password}>
              {isLoading ? 'Verifying...' : 'Login'}
            </button>
          </form>
          
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    )
  }

  // Dashboard
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Dashboard</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>
      
      <nav className="admin-tabs">
        <button 
          className={activeTab === 'tokens' ? 'active' : ''} 
          onClick={() => setActiveTab('tokens')}
        >
          Create Links
        </button>
        <button 
          className={activeTab === 'events' ? 'active' : ''} 
          onClick={() => setActiveTab('events')}
        >
          Analytics
        </button>
      </nav>
      
      <main className="admin-content">
        {activeTab === 'tokens' && (
          <div className="tokens-panel">
            {/* Create new token form */}
            <section className="create-token-section">
              <h2>Create New Link</h2>
              <form onSubmit={createToken} className="create-form">
                <div className="form-group">
                  <label>Campaign Name</label>
                  <input
                    type="text"
                    value={newCampaign}
                    onChange={(e) => setNewCampaign(e.target.value)}
                    placeholder="e.g., Google SWE Intern 2026"
                  />
                </div>
                <div className="form-group">
                  <label>Expires in (days)</label>
                  <input
                    type="number"
                    value={newDays}
                    onChange={(e) => setNewDays(parseInt(e.target.value) || 30)}
                    min={1}
                    max={365}
                  />
                </div>
                <button type="submit" disabled={isLoading || !newCampaign.trim()}>
                  {isLoading ? 'Creating...' : 'Create Link'}
                </button>
              </form>
              
              {createdToken && (
                <div className="created-token">
                  <h3>✓ Link Created!</h3>
                  <div className="token-link">
                    <input type="text" value={createdToken.shortLink} readOnly />
                    <button onClick={() => copyToClipboard(createdToken.shortLink)}>
                      Copy
                    </button>
                  </div>
                  <p className="token-meta">
                    Campaign: {createdToken.campaign}<br />
                    Expires: {formatDate(createdToken.expiresAt)}
                  </p>
                </div>
              )}
            </section>
            
            {/* Existing tokens */}
            <section className="tokens-list-section">
              <h2>Active Links ({tokens.length})</h2>
              <div className="tokens-list">
                {tokens.length === 0 ? (
                  <p className="no-data">No tokens created yet</p>
                ) : (
                  tokens.map((token) => (
                    <div key={token.token} className="token-item">
                      <div className="token-info">
                        <strong>{token.campaign}</strong>
                        <span className="token-code">{token.token}</span>
                      </div>
                      <div className="token-actions">
                        <button onClick={() => copyToClipboard(token.shortLink)}>
                          Copy Link
                        </button>
                      </div>
                      <div className="token-dates">
                        <span>Created: {formatDate(token.createdAt)}</span>
                        <span>Expires: {formatDate(token.expiresAt)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
        
        {activeTab === 'events' && (
          <div className="events-panel">
            <div className="analytics-header">
              <h2>Analytics by Link</h2>
              <button 
                onClick={() => { loadTokens(password); loadEvents(password); }} 
                className="refresh-btn"
              >
                Refresh
              </button>
            </div>
            
            <div className="analytics-list">
              {tokens.length === 0 ? (
                <p className="no-data">No links created yet</p>
              ) : (
                tokens.map((token) => {
                  // Get events for this specific token
                  const tokenEvents = events.filter(e => e.token === token.token);
                  const lastAccessed = tokenEvents.length > 0 
                    ? tokenEvents[0].timestamp 
                    : null;
                  const accessCount = tokenEvents.length;
                  
                  return (
                    <AnalyticsItem
                      key={token.token}
                      token={token}
                      accessCount={accessCount}
                      lastAccessed={lastAccessed}
                      events={tokenEvents}
                      formatDate={formatDate}
                    />
                  );
                })
              )}
            </div>
          </div>
        )}
      </main>
      
      {error && <div className="error-toast">{error}</div>}
    </div>
  )
}

export default Admin
