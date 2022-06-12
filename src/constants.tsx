const constants = {
  API_URL: import.meta.env.VITE_REACT_APP_API_URL,
  uploadRequestStatus: {
    COMPLETED: 'COMPLETED',
    FOLDER_NOT_FOUND: 'FOLDER_NOT_FOUND',
    PLAYLIST_NOT_FOUND: 'PLAYLIST_NOT_FOUND',
    START: 'START',
    RUNNING: 'RUNNING',
  },
  uploadRequestReadableStatus: {
    COMPLETED: 'Completed',
    FOLDER_NOT_FOUND: 'Folder not found',
    PLAYLIST_NOT_FOUND: 'Playlist not found',
    START: 'Start',
    RUNNING: 'Running',
  },
  uploadRequestStatusState: {
    COMPLETED: 'completed',
    FOLDER_NOT_FOUND: 'failed',
    PLAYLIST_NOT_FOUND: 'failed',
    START: 'pending',
    RUNNING: 'pending',
  },
  pages: {
    INDEX: {
      key: 'INDEX',
      title: 'Index',
      header: 'List of all upload request.',
      path: '/',
    },
    LOGIN: { key: 'LOGIN', title: 'Login', header: '', path: '/login/' },
    LOGOUT: { key: 'LOGOUT', title: 'Logout', header: '', path: '/logout/' },
    CREATE: {
      key: 'CREATE',
      title: 'Create Request',
      header: '',
      path: '/create/',
    },
  },
}

export default constants
