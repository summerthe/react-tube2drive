import constants from './constants'

type uploadRequestStatusType = keyof typeof constants.uploadRequestStatus

export interface ILoginForm {
  email: string
  password: string
}

export interface ILoginFormResponse {
  refresh: string
  access: string
}

export interface IAccessTokenResponse {
  access: string
}

export default interface IUploadRequest {
  id: string
  guid: string
  playlist_link: string
  playlist_name: string
  folder_link: string
  status: uploadRequestStatusType
  user: number
  slug: string
  updated_at: string
  created_at: string
}

export interface IUploadRequestForm {
  playlist_link: string
  folder_link: string
}
