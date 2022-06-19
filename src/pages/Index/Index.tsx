import axios from 'axios'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import DateStack from '../../components/DateStack/DateStack'
import Header from '../../components/Header/Header'
import constants from '../../constants'
import { resetAuthState } from '../../features/auth/AuthSlice'
import { setCurrentPageKey } from '../../features/navbar/NavbarSlice'
import {
  setUploadRequests,
  selectUploadRequest,
  setFetched,
  resetUploadRequestState,
} from '../../features/uploadRequest/UploadRequestSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import IUploadRequest from '../../types'
import utils from '../../utils'

function Index(): JSX.Element {
  const tableColumns = ['Youtube', 'Drive', 'Status', 'Last Updated', 'Created']
  const { uploadRequests, hasFetched } = useAppSelector(selectUploadRequest)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const fetchData = (): void => {
    const accessToken = localStorage.getItem('access')
    const config = {
      method: 'get',
      url: `${constants.API_URL}/tube2drive/upload-requests/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    axios(config)
      .then(response => response.data)
      .then((response: IUploadRequest[]) => {
        dispatch(setFetched(true))
        dispatch(setUploadRequests(response))
      })
      .catch(async error => {
        if (error?.response?.status === 401) {
          const didRefresh = await utils.refreshToken()
          if (didRefresh) {
            // call `fetchData` again with new token
            fetchData()
          } else {
            // redirect to login page
            localStorage.removeItem('refresh')
            localStorage.removeItem('access')
            // remove current user's every state
            dispatch(resetUploadRequestState())
            dispatch(resetAuthState())
            navigate(constants.pages.LOGIN.path)
          }
        }
      })
  }

  useEffect(() => {
    type currentPageKeyOptions = keyof typeof constants.pages
    const currentPage = constants.pages.INDEX.key as currentPageKeyOptions
    dispatch(setCurrentPageKey(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // hit api only if didnt hit it before
    if (!hasFetched) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <main>
        <Header title={constants.pages.INDEX.header} />
        <section className="table">
          <table>
            <thead>
              <tr>
                {tableColumns.map(column => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uploadRequests.length === 0 && hasFetched ? (
                <tr>
                  <td colSpan={tableColumns.length} className="no-records">
                    No records found.
                  </td>
                </tr>
              ) : (
                uploadRequests.map(record => (
                  <tr key={record.guid}>
                    <td>
                      <div className="stack">
                        <a
                          href={record.playlist_link}
                          target="_blank"
                          className="title external"
                          rel="noreferrer nofollow">
                          {record.playlist_name}
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="stack">
                        <a
                          href={record.folder_link}
                          target="_blank"
                          className="title external"
                          rel="noreferrer nofollow">
                          Open Folder
                        </a>
                      </div>
                    </td>
                    <td>
                      <div
                        className={`status-badge ${
                          constants.uploadRequestStatusState[record.status]
                        }`}>
                        {constants.uploadRequestReadableStatus[record.status]}
                      </div>
                    </td>
                    <td>
                      <DateStack date={new Date(record.updated_at)} />
                    </td>
                    <td>
                      <DateStack date={new Date(record.created_at)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
      <Helmet>
        <title>{constants.pages.INDEX.title} | Tube2Drive</title>
      </Helmet>
    </>
  )
}

export default Index
