export const AUTH = 'AUTH';
export const CAMERA = 'CAMERA';
export const ALBUMS = 'ALBUMS';

export interface UserCD {
  user: {};
}

export interface CompDataStateTree {
  [AUTH]: UserCD;
  [CAMERA]: {};
  [ALBUMS]: {};
}
