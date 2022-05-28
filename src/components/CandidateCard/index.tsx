import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Candidate } from "../../pages/CandidateList/candidate.model";
import { useActions } from "../../state";
import styles from "./candidatecard.module.css";

type CandidateCardProps = {
  candidate: Candidate;
  shortlisted?: boolean;
  rejected?: boolean;
};

const CandidateCard = ({
  candidate: { Image, id, name },
  shortlisted,
  rejected,
}: CandidateCardProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { selectCandidate } = useActions();

  const selectCurrentCandidate = () => {
    selectCandidate(id);
    if (pathname.substr(1) === "") {
      navigate(id);
    }
  };

  return (
    <article
      className={`${styles.card} ${shortlisted && styles.shortlisted} ${
        rejected && styles.rejected
      }`}
      onClick={selectCurrentCandidate}
    >
      <img src={Image} alt={name} className={styles.image} />
      <section className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.id}># {id}</p>
      </section>
    </article>
  );
};

export default CandidateCard;
