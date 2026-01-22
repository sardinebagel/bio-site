// API Configuration
// These URLs are configured via environment variables during deployment

export const API_CONFIG = {
  // The validation endpoint - validates tokens and returns metadata
  validateUrl: import.meta.env.VITE_API_URL || '/api/validate',
  
  // Short link base URL (for reference/display purposes)
  shortLinkBase: import.meta.env.VITE_SHORT_LINK_URL || '',
  
  // Main site URL
  siteUrl: import.meta.env.VITE_SITE_URL || '',
}

export interface TokenValidationResponse {
  valid: boolean
  campaign?: string
  variant?: string
  destinationPath?: string
}

export async function validateToken(token: string): Promise<TokenValidationResponse> {
  try {
    const response = await fetch(`${API_CONFIG.validateUrl}?token=${encodeURIComponent(token)}`)
    
    if (!response.ok) {
      return { valid: false }
    }
    
    return await response.json()
  } catch (error) {
    console.error('Token validation failed:', error)
    return { valid: false }
  }
}
