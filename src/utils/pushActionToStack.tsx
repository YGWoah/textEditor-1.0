import { Action, ActionType } from "../types/types";
import CircularBuffer from "./CircularBuffer";

const INSERT_ACTION_TYPE = "insert";
/**
 * Pushes an action to the undo stack.

 * @param action The action to push to the stack.
 * @param payload The payload for the action.
 * @param undoStack The undo stack.
 */
export function pushActionToStack(
  action: ActionType,
  payload: any,
  undoStack: CircularBuffer
): void {
  let lastAction: Action = {
    type: action,
    payload: payload,
  };

  if (
    action === INSERT_ACTION_TYPE &&
    undoStack.peek()?.type === INSERT_ACTION_TYPE
  ) {
    let lastAction = undoStack.pop();
    if (lastAction?.payload) {
      lastAction.payload = lastAction?.payload + payload;
      undoStack.push(lastAction);
    }
  } else {
    undoStack.push(lastAction);
  }
}
