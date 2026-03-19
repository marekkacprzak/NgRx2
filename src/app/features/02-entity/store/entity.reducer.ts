import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Task } from '../../../shared/models/task.model';
import { EntityActions } from './entity.actions';

export interface TaskEntityState extends EntityState<Task> {
  loaded: boolean;
  loading: boolean;
  error: string | null;
  selectedId: number | null;
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

const initialState: TaskEntityState = taskAdapter.getInitialState({
  loaded: false,
  loading: false,
  error: null,
  selectedId: null,
});

export const entityFeature = createFeature({
  name: 'entityDemo',
  reducer: createReducer(
    initialState,
    on(EntityActions.loadTasks, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(EntityActions.loadTasksSuccess, (state, { tasks }) =>
      taskAdapter.setAll(tasks, { ...state, loaded: true, loading: false }),
    ),
    on(EntityActions.loadTasksFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(EntityActions.addTask, (state, { task }) =>
      taskAdapter.addOne(task, state),
    ),
    on(EntityActions.updateTask, (state, { update }) =>
      taskAdapter.updateOne(update, state),
    ),
    on(EntityActions.removeTask, (state, { id }) =>
      taskAdapter.removeOne(id, state),
    ),
    on(EntityActions.toggleTask, (state, { id }) => {
      const task = state.entities[id];
      if (!task) return state;
      return taskAdapter.updateOne(
        { id, changes: { completed: !task.completed } },
        state,
      );
    }),
    on(EntityActions.clearTasks, (state) => taskAdapter.removeAll(state)),
    on(EntityActions.selectTask, (state, { id }) => ({
      ...state,
      selectedId: id,
    })),
  ),
});

const { selectAll, selectEntities, selectTotal } =
  taskAdapter.getSelectors(entityFeature.selectEntityDemoState);

export const selectAllTasks = selectAll;
export const selectTaskEntities = selectEntities;
export const selectTaskTotal = selectTotal;
export const {
  selectLoaded,
  selectLoading: selectTasksLoading,
  selectError: selectTasksError,
  selectSelectedId,
} = entityFeature;
