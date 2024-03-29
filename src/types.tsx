import constants from './constants'

type uploadRequestStatusType = keyof typeof constants.uploadRequestStatus
type youtubeEntityType = keyof typeof constants.youtubeEntity

export interface ILoginForm {
  email: string
  password: string
}

export interface ILoginFormResponse {
  refresh: string
  access: string
  user: {
    unique_identifier: string
  }
}

export interface IAccessTokenResponse {
  access: string
}

export default interface IUploadRequest {
  id: number
  unique_identifier: string
  youtube_link: string
  youtube_entity_name: string
  folder_link: string
  status: uploadRequestStatusType
  user: number
  slug: string
  updated_at: string
  created_at: string
}

export interface IUploadRequestForm {
  youtube_link: string
  youtube_entity_type: youtubeEntityType
  folder_link: string
}
export interface IUploadRequestFormError {
  youtube_link: string
  youtube_entity_type: string
  folder_link: string
}
