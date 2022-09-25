import axios from 'axios'
import React, { useEffect, useState } from 'react'
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
  removeUploadRequests,
  resetUploadRequestState,
} from '../../features/uploadRequest/UploadRequestSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import IUploadRequest from '../../types'
import utils from '../../utils'
import WebsocketRequestUpdate from '../../Websocket/RequestUpdate/RequestUpdate'

function Index(): JSX.Element {
  const tableColumns = ['Youtube', 'Drive', 'Status', 'Last Updated', 'Created']
  const { uploadRequests, hasFetched } = useAppSelector(selectUploadRequest)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const fetchData = (forced = false): void => {
    const accessToken = localStorage.getItem('access')
    setLoading(true)
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
        setLoading(false)
        dispatch(setFetched(true))
        dispatch(setUploadRequests(response))
      })
      .catch(async error => {
        if (error?.response?.status === 401) {
          const didRefresh = await utils.refreshToken()
          if (didRefresh) {
            // call `fetchData` again with new token
            fetchData(forced)
          } else {
            // redirect to login page
            localStorage.removeItem('refresh')
            localStorage.removeItem('access')
            localStorage.removeItem('userUuid')
            // remove current user's every state
            dispatch(resetUploadRequestState())
            dispatch(resetAuthState())
            navigate(constants.pages.LOGIN.path)
          }
        }
      })
  }

  const removeRequest = (requestId: number): void => {
    setLoading(true)
    const accessToken = localStorage.getItem('access')
    const config = {
      method: 'delete',
      url: `${constants.API_URL}/tube2drive/upload-requests/${requestId}/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    axios(config)
      .then(() => {
        setLoading(false)
        dispatch(removeUploadRequests(requestId))
      })
      .catch(async error => {
        if (error?.response?.status === 401) {
          const didRefresh = await utils.refreshToken()
          if (didRefresh) {
            // call `fetchData` again with new token
            removeRequest(requestId)
          } else {
            // redirect to login page
            localStorage.removeItem('refresh')
            localStorage.removeItem('access')
            localStorage.removeItem('userUuid')
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

  WebsocketRequestUpdate()

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
                {/* Data columns */}
                {tableColumns.map(column => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
                {/* Action column, header button is its own to refresh data. 
                Row action button is to delete row request. */}
                <th>
                  <button
                    aria-label="Refresh table data"
                    type="button"
                    className={`action ${loading ? 'loading' : ''}`}
                    onClick={() => fetchData(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}>
                      <title>Refresh table data</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 
                      11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </th>
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
                  <tr key={record.unique_identifier}>
                    <td>
                      <div className="stack">
                        <a
                          href={record.youtube_link}
                          target="_blank"
                          className="title external"
                          rel="noreferrer nofollow">
                          {record.youtube_entity_name}
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
                    <td>
                      <button
                        aria-label="Delete request"
                        type="button"
                        className="action"
                        onClick={() => removeRequest(record.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}>
                          <title>Delete request</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2
                            0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
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
