import { Injectable, inject } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { catchError, delay, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { UserService } from '../../../shared/services/user.service';
import { EffectsActions } from './effects.actions';
import { selectCounter } from './effects.reducer';

@Injectable()
export class EffectsDemoEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);
  private readonly store = inject(Store);

  readonly loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EffectsActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => EffectsActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(EffectsActions.loadUsersFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  readonly incrementCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EffectsActions.incrementCounter),
      withLatestFrom(this.store.select(selectCounter)),
      delay(500),
      map(([, counter]) =>
        EffectsActions.incrementCounterSuccess({ value: counter + 1 }),
      ),
    ),
  );

  readonly logActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          EffectsActions.loadUsers,
          EffectsActions.loadUsersSuccess,
          EffectsActions.loadUsersFailure,
          EffectsActions.incrementCounter,
          EffectsActions.incrementCounterSuccess,
          EffectsActions.resetCounter,
        ),
        tap((action) => console.log('[Effects Demo]', action.type)),
      ),
    { dispatch: false },
  );

  ngrxOnInitEffects(): Action {
    console.log('[Effects Demo] OnInitEffects — efekt zainicjalizowany');
    return { type: '[Effects Demo] Init' };
  }
}
