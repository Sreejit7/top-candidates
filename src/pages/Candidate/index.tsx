import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  CandidateActionTypes,
  useCandidateContext,
} from "../../contexts/useCandidateContext";
import styles from "./candidate.module.css";

const Candidate = () => {
  const {
    state: { shortlisted, rejected, currentCandidate },
    dispatch,
  } = useCandidateContext();
  const params = useParams();
  const navigate = useNavigate();
  const [inShortlist, setInShortlist] = useState(false);
  const [inRejected, setInRejected] = useState(false);

  useEffect(() => {
    if (!currentCandidate && params.id) {
      dispatch({
        type: CandidateActionTypes.SET_CURRENT_CANDIDATE,
        id: params.id,
      });
    }

    // Reset current candidate on page unmounting
    return () => {
      dispatch({
        type: CandidateActionTypes.RESET_CURRENT_CANDIDATE,
      });
    };
  }, [dispatch]);

  // Update document title based on candidate name
  useEffect(() => {
    if (currentCandidate) {
      document.title = `${currentCandidate.name} - Top Candidates`;
    }
  }, []);

  // Update state if candidate in shortlisted or rejected list
  useEffect(() => {
    if (
      currentCandidate &&
      shortlisted.some((candidate) => candidate.id === currentCandidate?.id)
    ) {
      setInShortlist(true);
    }

    if (
      currentCandidate &&
      rejected.some((candidate) => candidate.id === currentCandidate?.id)
    ) {
      setInRejected(true);
    }
  }, []);

  const shortListCandidate = () => {
    if (params.id) {
      /** 
       * If candidate was rejected earlier, candidate has to be
       * removed from rejected list before shortlisting
       * */ 
      if (inRejected) {
        dispatch({
          type: CandidateActionTypes.DELETE_FROM_REJECTED,
          id: params.id,
        });
      }
      dispatch({
        type: CandidateActionTypes.SHORTLIST_CANDIDATE,
        id: params.id,
      });
    }
    navigate("/", {
      replace: true,
    });
  };

  const rejectCandidate = () => {
    if (params.id) {
      /** 
       * If candidate was shortlisted earlier, candidate has to be
       * removed from shortlisted list before rejecting
       * */ 
      if (inShortlist) {
        dispatch({
          type: CandidateActionTypes.DELETE_FROM_SHORTLIST,
          id: params.id,
        });
      }
      dispatch({
        type: CandidateActionTypes.REJECT_CANDIDATE,
        id: params.id,
      });
    }
    navigate("/", {
      replace: true,
    });
  };

  return (
    <main className={`page ${styles.candidate}`}>
      <img
        src={currentCandidate?.Image}
        className={styles.image}
        alt={currentCandidate?.name}
      />
      <section className={styles.details}>
        <section className={styles["details-text"]}>
          <span className={styles.name}>Candidate #{currentCandidate?.id}</span>
          <h2 className={styles.name}>{currentCandidate?.name}</h2>
        </section>
        <span className={styles.buttons}>
          <button
            className="btn btn-success"
            onClick={shortListCandidate}
            disabled={inShortlist}
          >
            {inShortlist ? "Shortlisted!" : "Shortlist"}
          </button>
          <button
            className="btn btn-danger"
            onClick={rejectCandidate}
            disabled={inRejected}
          >
            {inRejected ? "Rejected!" : "Reject"}
          </button>
        </span>
      </section>
    </main>
  );
};

export default Candidate;
