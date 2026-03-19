import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { TaskService } from '../../../shared/services/task.service';
import { EntityActions } from './entity.actions';

@Injectable()
export class EntityDemoEffects {
  private readonly actions$ = inject(Actions);
  private readonly taskService = inject(TaskService);

  readonly loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntityActions.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => EntityActions.loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(EntityActions.loadTasksFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
