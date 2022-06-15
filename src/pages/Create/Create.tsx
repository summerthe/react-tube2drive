import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

import Header from '../../components/Header/Header'
import constants from '../../constants'
import { setCurrentPageKey } from '../../features/navbar/NavbarSlice'
import { useAppDispatch } from '../../store'

function Create(): JSX.Element {
  const dispatch = useAppDispatch()

  useEffect(() => {
    type currentPageKeyOptions = keyof typeof constants.pages
    const currentPage = constants.pages.CREATE.key as currentPageKeyOptions
    dispatch(setCurrentPageKey(currentPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <main>
        <Header title={constants.pages.CREATE.header} />
        <section className="form">
          <form method="POST">
            <h2>{constants.pages.CREATE.subheader}</h2>
            <div className="inputs">
              <div className="input-container">
                <label htmlFor="playlist">Playlist</label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/playlist?list=PLoel2ZB30FAEdpACztQruvIujFxz0s4wS"
                  id="playlist"
                />
              </div>
              <div className="input-container">
                <label htmlFor="folder">Folder</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/drive/folders/1-U4HGXnc23bCKyCpGXSj4ImPVpub821"
                  id="folder"
                />
              </div>

              <div className="notes">
                <ul>
                  <li>This is note 1.</li>
                </ul>
              </div>
              <div className="errors">
                <ul>
                  <li>Error 1</li>
                  <li>Error 2</li>
                </ul>
              </div>

              <div className="input-container">
                <button className="btn btn-primary btn-100" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
      <Helmet>
        <title>{constants.pages.CREATE.title} | Tube2Drive</title>
      </Helmet>
    </>
  )
}

export default Create
