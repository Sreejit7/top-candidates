import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import CandidateCard from "../../components/CandidateCard";
import { Candidate } from "./candidate.model";
import styles from "./candidatelist.module.css";

type CandidateListProps = {
  candidates: Candidate[];
  shortlisted?: boolean;
  rejected?: boolean;
  emptyText: string;
};
const CandidateList = ({
  candidates,
  emptyText,
  shortlisted,
  rejected,
}: CandidateListProps) => {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <header className={styles.header}>
        <span className={styles.input}>
          <input
            className={styles.search}
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            disabled={candidates.length === 0}
          />
          <BiSearchAlt className={styles["search-icon"]} />
        </span>
      </header>
      {candidates.length > 0 ? (
        <ul className={styles.list}>
          {candidates
            .filter((candidate) =>
              searchText === ""
                ? candidate
                : candidate.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            )
            .map((candidate) => (
              <li key={candidate.id}>
                <CandidateCard
                  candidate={candidate}
                  shortlisted={shortlisted}
                  rejected={rejected}
                />
              </li>
            ))}
          {searchText !== "" &&
            !candidates.some((candidate) =>
              candidate.name.toLowerCase().includes(searchText.toLowerCase())
            ) && <span>No Candidates Found!</span>}
        </ul>
      ) : (
        <h3>{emptyText}</h3>
      )}
    </>
  );
};

export default CandidateList;
