import { Dispatch } from "redux";
import { Candidate } from "../../pages/CandidateList/candidate.model";
import { CandidateActionTypes } from "../action-types";
import { Action } from "../actions";

export const selectCandidate = (id: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CandidateActionTypes.SET_CURRENT_CANDIDATE,
      id,
    });
  };
};

export const setCandidates = (candidates: Candidate[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CandidateActionTypes.SET_CANDIDATES,
      candidates,
    });
  };
};

export const shortlistCandidate = (id: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CandidateActionTypes.SHORTLIST_CANDIDATE,
      id,
    });
  };
};

export const rejectCandidate = (id: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CandidateActionTypes.REJECT_CANDIDATE,
      id,
    });
  };
};

export const resetCurrentCandidate = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CandidateActionTypes.RESET_CURRENT_CANDIDATE,
    });
  };
};

export const deleteCandidateFromShortlist = (id: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CandidateActionTypes.DELETE_FROM_SHORTLIST,
      id,
    });
  };
};

export const deleteCandidateFromRejected = (id: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: CandidateActionTypes.DELETE_FROM_REJECTED,
      id,
    });
  };
};