import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { State, useActions } from "../../state";

import styles from "./candidate.module.css";

const Candidate = () => {
  const { currentCandidate, shortlisted, rejected } = useSelector(
    (state: State) => state.candidates
  );
  const {
    selectCandidate,
    resetCurrentCandidate,
    rejectCandidate,
    shortlistCandidate,
    deleteCandidateFromRejected,
    deleteCandidateFromShortlist,
  } = useActions();
  const params = useParams();
  const navigate = useNavigate();
  const [inShortlist, setInShortlist] = useState(false);
  const [inRejected, setInRejected] = useState(false);

  useEffect(() => {
    if (!currentCandidate && params.id) {
      selectCandidate(params.id);
    }

    // Reset current candidate on page unmounting
    return () => {
      resetCurrentCandidate();
    };
  }, []);

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

  const shortlistCurrentCandidate = () => {
    if (params.id) {
      /**
       * If candidate was rejected earlier, candidate has to be
       * removed from rejected list before shortlisting
       * */
      if (inRejected) {
        deleteCandidateFromRejected(params.id);
      }
      shortlistCandidate(params.id);
    }
    navigate("/", {
      replace: true,
    });
  };

  const rejectCurrentCandidate = () => {
    if (params.id) {
      /**
       * If candidate was shortlisted earlier, candidate has to be
       * removed from shortlisted list before rejecting
       * */
      if (inShortlist) {
        deleteCandidateFromShortlist(params.id);
      }
      rejectCandidate(params.id);
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
            onClick={shortlistCurrentCandidate}
            disabled={inShortlist}
          >
            {inShortlist ? "Shortlisted!" : "Shortlist"}
          </button>
          <button
            className="btn btn-danger"
            onClick={rejectCurrentCandidate}
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
