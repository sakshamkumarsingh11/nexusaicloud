import api from './api'
import type { ContactFormData, ApiResponse } from '@/types'

export async function submitEnquiry(
  data: ContactFormData,
  source: 'contact' | 'project' | 'service' = 'contact',
): Promise<ApiResponse> {
  const endpoint =
    source === 'project'
      ? '/api/v1/projects'
      : source === 'service'
        ? '/api/v1/services'
        : '/api/v1/contact'

  const response = await api.post(endpoint, {
    ...data,
    source,
    website: '', // honeypot field — always empty
  })

  return response.data
}

