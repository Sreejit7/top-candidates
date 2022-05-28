import { Candidate } from "../../pages/CandidateList/candidate.model";
import { CandidateActionTypes } from "../action-types";
import { Action } from "../actions";

export type State = {
  candidates: Candidate[];
  shortlisted: Candidate[];
  rejected: Candidate[];
  currentCandidate?: Candidate;
};

const initialState: State = {
  candidates: [],
  shortlisted: [],
  rejected: [],
};

export const candidatesReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case CandidateActionTypes.SET_CANDIDATES:
      return {
        ...state,
        candidates: action.candidates,
      };
    case CandidateActionTypes.SET_CURRENT_CANDIDATE:
      const candidateIndex = state.candidates.findIndex(
        (candidate) => candidate.id === action.id
      );
      return {
        ...state,
        currentCandidate: { ...state.candidates[candidateIndex] },
      };
    case CandidateActionTypes.RESET_CURRENT_CANDIDATE:
      return {
        ...state,
        currentCandidate: undefined,
      };
    case CandidateActionTypes.SHORTLIST_CANDIDATE:
      const slCandidateIndex = state.candidates.findIndex(
        (candidate) => candidate.id === action.id
      );
      return {
        ...state,
        shortlisted: [
          ...state.shortlisted,
          { ...state.candidates[slCandidateIndex] },
        ],
      };
    case CandidateActionTypes.REJECT_CANDIDATE:
      const rjCandidateIndex = state.candidates.findIndex(
        (candidate) => candidate.id === action.id
      );
      return {
        ...state,
        rejected: [
          ...state.rejected,
          { ...state.candidates[rjCandidateIndex] },
        ],
      };
    case CandidateActionTypes.DELETE_FROM_SHORTLIST:
      const dslCandidateIndex = state.shortlisted.findIndex(
        (candidate) => candidate.id === action.id
      );
      let updatedShortlist = [...state.shortlisted];
      if (dslCandidateIndex !== -1) {
        updatedShortlist.splice(dslCandidateIndex, 1);
      }
      return {
        ...state,
        shortlisted: updatedShortlist,
      };
    case CandidateActionTypes.DELETE_FROM_REJECTED:
      const drjCandidateIndex = state.rejected.findIndex(
        (candidate) => candidate.id === action.id
      );
      let updatedRejectlist = [...state.rejected];
      if (drjCandidateIndex !== -1) {
        updatedRejectlist.splice(drjCandidateIndex, 1);
      }
      return {
        ...state,
        rejected: updatedRejectlist,
      };
    default:
      return { ...state };
  }
};
