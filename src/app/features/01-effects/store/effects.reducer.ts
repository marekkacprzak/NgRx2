import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';
import { EffectsActions } from './effects.actions';

export interface EffectsState {
  users: User[];
  loading: boolean;
  error: string | null;
  counter: number;
}

const initialState: EffectsState = {
  users: [],
  loading: false,
  error: null,
  counter: 0,
};

export const effectsFeature = createFeature({
  name: 'effectsDemo',
  reducer: createReducer(
    initialState,
    on(EffectsActions.loadUsers, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(EffectsActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      users,
      loading: false,
    })),
    on(EffectsActions.loadUsersFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(EffectsActions.incrementCounter, (state) => state),
    on(EffectsActions.incrementCounterSuccess, (state, { value }) => ({
      ...state,
      counter: value,
    })),
    on(EffectsActions.resetCounter, (state) => ({
      ...state,
      counter: 0,
    })),
  ),
});

export const {
  selectUsers,
  selectLoading,
  selectError,
  selectCounter,
} = effectsFeature;
