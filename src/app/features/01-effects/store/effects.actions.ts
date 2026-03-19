import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';

export const EffectsActions = createActionGroup({
  source: 'Effects Demo',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),
    'Increment Counter': emptyProps(),
    'Increment Counter Success': props<{ value: number }>(),
    'Reset Counter': emptyProps(),
  },
});
