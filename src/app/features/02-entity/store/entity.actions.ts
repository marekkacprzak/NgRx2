import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Task } from '../../../shared/models/task.model';

export const EntityActions = createActionGroup({
  source: 'Entity Demo',
  events: {
    'Load Tasks': emptyProps(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),
    'Add Task': props<{ task: Task }>(),
    'Update Task': props<{ update: Update<Task> }>(),
    'Remove Task': props<{ id: number }>(),
    'Toggle Task': props<{ id: number }>(),
    'Clear Tasks': emptyProps(),
    'Select Task': props<{ id: number | null }>(),
  },
});
