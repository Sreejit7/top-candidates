import { Candidate } from "../../pages/CandidateList/candidate.model";
import { CandidateActionTypes } from "../action-types";

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

export type Action =
  | SetCandidates
  | SetCurrentCandidate
  | ResetCurrentCandidate
  | ShortListCandidate
  | RejectCandidate
  | DeleteFromShortlist
  | DeleteFromRejected;