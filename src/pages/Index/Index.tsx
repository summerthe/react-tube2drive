import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import DateStack from '../../components/DateStack/DateStack'
import Header from '../../components/Header/Header'
import constants from '../../constants'
import { setCurrentPageKey } from '../../features/navbar/NavbarSlice'
import { useAppDispatch } from '../../store'
import IUploadRequest from '../../types'

function Index(): JSX.Element {
  const tableColumns = ['Youtube', 'Drive', 'Status', 'Last Updated', 'Created']
  const records: IUploadRequest[] = []
  const dispatch = useAppDispatch()

  useEffect(() => {
    type currentPageKeyOptions = keyof typeof constants.pages
    const currentPage = constants.pages.INDEX.key as currentPageKeyOptions
    dispatch(setCurrentPageKey(currentPage))
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
              {records.length === 0 ? (
                <tr>
                  <td colSpan={tableColumns.length} className="no-records">
                    No records found.
                  </td>
                </tr>
              ) : (
                records.map(record => (
                  <tr>
                    <td>
                      <div className="stack">
                        <a
                          href={record.playlist_link}
                          target="_blank"
                          className="title"
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
                          className="title"
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
