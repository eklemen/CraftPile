import { AddChildMutation, Child, GetUserQuery } from '../generated/API';

export const AUTH = 'AUTH';
export const CAMERA = 'CAMERA';
export const ALBUMS = 'ALBUMS';

export interface UserCD {
  user?: GetUserQuery['getUser'] | AddChildMutation['addChild'];
}

type ChildArray = Pick<NonNullable<GetUserQuery['getUser']>, 'children'>['children']
export type ChildT = NonNullable<NonNullable<ChildArray>[0]>

export interface CameraCD {
  queue?: Record<string, {isComplete: boolean}>;
  selectedChild: ChildT | null;
}

export interface CompDataStateTree {
  [AUTH]: UserCD;
  [CAMERA]: CameraCD;
  [ALBUMS]: {};
}
