import React, { useReducer } from "react";
import { Candidate } from "../pages/CandidateList/candidate.model";

type ChildrenProps = {
  children: React.ReactNode;
};

export enum CandidateActionTypes {
  SET_CANDIDATES = "SET_CANDIDATES",
  SET_CURRENT_CANDIDATE = "SET_CURRENT_CANDIDATE",
  RESET_CURRENT_CANDIDATE = "RESET_CURRENT_CANDIDATE",
  SHORTLIST_CANDIDATE = "SHORTLIST_CANDIDATE",
  REJECT_CANDIDATE = "REJECT_CANDIDATE",
  DELETE_FROM_SHORTLIST = "DELETE_FROM_SHORTLIST",
  DELETE_FROM_REJECTED = "DELETE_FROM_REJECTED",
}

type SetCandidates = {
  type: CandidateActionTypes.SET_CANDIDATES;
  candidates: Candidate[];
};

type SetCurrentCandidate = {
  type: CandidateActionTypes.SET_CURRENT_CANDIDATE;
  id: string;
};

type ResetCurrentCandidate = {
  type: CandidateActionTypes.RESET_CURRENT_CANDIDATE;
};

type ShortListCandidate = {
  type: CandidateActionTypes.SHORTLIST_CANDIDATE;
  id: string;
};

type DeleteFromShortlist = {
  type: CandidateActionTypes.DELETE_FROM_SHORTLIST;
  id: string;
};

type RejectCandidate = {
  type: CandidateActionTypes.REJECT_CANDIDATE;
  id: string;
};

type DeleteFromRejected = {
  type: CandidateActionTypes.DELETE_FROM_REJECTED;
  id: string;
};

type Action =
  | SetCandidates
  | SetCurrentCandidate
  | ResetCurrentCandidate
  | ShortListCandidate
  | RejectCandidate
  | DeleteFromShortlist
  | DeleteFromRejected;

export type State = {
  candidates: Candidate[];
  shortlisted: Candidate[];
  rejected: Candidate[];
  currentCandidate?: Candidate;
};

export type Dispatch = (action: Action) => void;

const initialState: State = {
  candidates: [],
  shortlisted: [],
  rejected: [],
};

const CandidatesReducer = (
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
      console.log(state.candidates[slCandidateIndex]);
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

export const CandidateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const CandidateProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(CandidatesReducer, initialState);

  const value = { state, dispatch };

  return (
    <CandidateContext.Provider value={value}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidateContext = () => {
  const context = React.useContext(CandidateContext);
  if (context === undefined) {
    throw new Error("No value provided for context!");
  }
  return context;
};
