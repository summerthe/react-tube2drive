const constants = {
  API_URL: import.meta.env.VITE_API_URL,
  WS_URL: import.meta.env.VITE_WS_URL,
  driveServiceAccountEmail: import.meta.env.VITE_DRIVE_SERVICE_ACCOUNT_EMAIL,
  apiTestUserEmail: import.meta.env.VITE_API_TEST_USER_EMAIL,
  apiTestUserPassword: import.meta.env.VITE_API_TEST_USER_PASSWORD,
  uploadRequestStatus: {
    COMPLETED: 'COMPLETED',
    FOLDER_NOT_FOUND: 'FOLDER_NOT_FOUND',
    PLAYLIST_NOT_FOUND: 'PLAYLIST_NOT_FOUND',
    VIDEO_NOT_FOUND: 'VIDEO_NOT_FOUND',
    CHANNEL_NOT_FOUND: 'CHANNEL_NOT_FOUND',
    START: 'START',
    RUNNING: 'RUNNING',
  },
  uploadRequestReadableStatus: {
    COMPLETED: 'Completed',
    FOLDER_NOT_FOUND: 'Folder not found',
    PLAYLIST_NOT_FOUND: 'Playlist not found',
    VIDEO_NOT_FOUND: 'Video not found',
    CHANNEL_NOT_FOUND: 'Channel not found',
    START: 'Start',
    RUNNING: 'Running',
  },
  uploadRequestStatusState: {
    COMPLETED: 'completed',
    FOLDER_NOT_FOUND: 'failed',
    PLAYLIST_NOT_FOUND: 'failed',
    VIDEO_NOT_FOUND: 'failed',
    CHANNEL_NOT_FOUND: 'failed',
    START: 'pending',
    RUNNING: 'pending',
  },
  youtubeEntity: {
    PLAYLIST: 'PLAYLIST',
    VIDEO: 'VIDEO',
    CHANNEL: 'CHANNEL',
  },
  pages: {
    INDEX: {
      key: 'INDEX',
      title: 'Index',
      header: 'List of all upload request.',
      subheader: '',
      path: '/',
    },
    LOGIN: {
      key: 'LOGIN',
      title: 'Login',
      header: 'Login',
      subheader: 'Fill login information.',
      path: '/login/',
    },
    LOGOUT: {
      key: 'LOGOUT',
      title: 'Logout',
      header: '',
      subheader: '',
      path: '/logout/',
    },
    NOT_FOUND: {
      key: 'NOT_FOUND',
      title: 'Page Not Found.',
      header: 'Page Not Found.',
      subheader: '',
      path: '*',
    },
    CREATE: {
      key: 'CREATE',
      title: 'Create new request',
      header: 'Create new request',
      subheader: 'New request',
      path: '/create/',
    },
  },
}

export default constants
