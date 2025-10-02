import { useImmer } from "use-immer";

function useHistory(initialValue, { max = 20 } = {}) {
  const [state, update] = useImmer({
    history: [initialValue],
    index: 0,
  });

  const value = state.history[state.index];

  const set = (updater) => {
    update((draft) => {
      const current = draft.history[draft.index];
      const next = typeof updater === "function" ? updater(current) : updater;

      // No-op if nothing changed (by reference). Will adjust if we need deep check.
      if (next === current) return;

      // branch + push next snapshot
      draft.history = draft.history.slice(0, draft.index + 1);
      draft.history.push(next);
      draft.index = draft.history.length - 1;

      // enforce cap by dropping oldest snapshots.
      // helps e.g. if we change MAX_HISTORY
      if (draft.history.length > max) {
        const overflow = draft.history.length - max;
        draft.history.splice(0, overflow);
        draft.index -= overflow; // keep pointing to latest
      }
    });
  };

  const undo = () =>
    update((d) => {
      if (d.index > 0) d.index -= 1;
    });
  const redo = () =>
    update((d) => {
      if (d.index < d.history.length - 1) d.index += 1;
    });

  const canUndo = state.index > 0;
  const canRedo = state.index < state.history.length - 1;

  return {
    value, // current snapshot
    set, // usage: set(nextValue) or set(prev => nextValue)
    undo,
    redo,
    canUndo,
    canRedo,
    index: state.index,
    length: state.history.length,
  };
}

export default useHistory;
