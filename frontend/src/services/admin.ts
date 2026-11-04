import api from './api'
import type { Enquiry, EnquiryStatus } from '@/types'

interface AdminLoginData {
  username: string
  password: string
}

export async function adminLogin(data: AdminLoginData): Promise<{ message: string }> {
  const response = await api.post('/api/v1/admin/login', data)
  return response.data
}

export async function adminLogout(): Promise<void> {
  await api.post('/api/v1/admin/logout')
}

export async function getAdminMe(): Promise<{ username: string; email: string }> {
  const response = await api.get('/api/v1/admin/me')
  return response.data
}

export async function getEnquiries(params?: {
  status_filter?: string
  source_filter?: string
  skip?: number
  limit?: number
}): Promise<{ enquiries: Enquiry[]; total: number }> {
  const response = await api.get('/api/v1/admin/enquiries', { params })
  return response.data
}

export async function getEnquiry(id: string): Promise<Enquiry> {
  const response = await api.get(`/api/v1/admin/enquiries/${id}`)
  return response.data
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus,
): Promise<Enquiry> {
  const response = await api.patch(`/api/v1/admin/enquiries/${id}/status`, {
    status,
  })
  return response.data
}

