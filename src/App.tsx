import React, { useEffect } from "react";
import "./App.css";
import CandidateList from "./pages/CandidateList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Candidate from "./pages/Candidate";

import Header from "./components/Header";
import DocumentTitle from "./components/DocumentTitle";
import { useActions, State } from "./state";
import { useSelector } from "react-redux";

function App() {
  const { setCandidates } = useActions();
  const { candidates, rejected, shortlisted } = useSelector(
    (state: State) => state.candidates
  );

  useEffect(() => {
    const getCandidatesList = () => {
      fetch(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json"
      )
        .then((response: Response) => response.json())
        .then((data) => {
          setCandidates(data);
        });
    };
    getCandidatesList();
  }, []);

  return (
    <>
      <Router>
        <DocumentTitle />
        <Header />
        <main className="page">
          <Routes>
            <Route
              path="/rejected"
              element={
                <CandidateList
                  candidates={rejected}
                  emptyText="No candidates have been rejected yet!"
                  rejected={true}
                />
              }
            />
            <Route
              path="/shortlisted"
              element={
                <CandidateList
                  candidates={shortlisted}
                  emptyText="No candidates have been shortlisted yet!"
                  shortlisted={true}
                />
              }
            />
            <Route path="/:id" element={<Candidate />} />
            <Route
              path="/"
              element={
                <CandidateList
                  candidates={candidates}
                  emptyText="No Candidates Available!"
                />
              }
            />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
