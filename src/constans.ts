// variables
export const ROUTER_PATHS = {
  LOGIN: '/login',
  RESET: '/reset',
  HOME: '(/)?',
  USERS: '/users',
  SIGN_UP: '/signup',
  ALBUMS: '/albums',
  ALBUM_DETAILS: '/albums/(:id)?',
  ALBUM_EDIT: '/albums/edit/(:id)?',
  SONGS: '/songs',
  SONG_EDIT: '/songs/edit(/:id)?',
} as const;

export const ROLE = {
  MASTER: 'master',
  EDITOR: 'editor',
  WATCHER: 'watcher',
};

export { default as NO_IMAGE } from './assets/images/no_image.jpg'

export const UFO_SOCIETY_OFFISIAL = "https://ufo-society-1974.web.app/" as const;