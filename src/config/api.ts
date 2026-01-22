// API Configuration
export const API_CONFIG = {
  // The validation endpoint - validates tokens and returns metadata
  validateUrl: 'https://api.cameronjim.com/validate',
  
  // Short link base URL (for reference/display purposes)
  shortLinkBase: 'https://go.cameronjim.com',
  
  // Main site URL
  siteUrl: 'https://www.cameronjim.com',
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
