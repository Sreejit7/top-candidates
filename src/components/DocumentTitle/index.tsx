import { useEffect } from "react";
import { useLocation } from "react-router";

const DocumentTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname.substr(1)) {
      case "":
        document.title = "Home - Top Candidates";
        break;
      case "shortlisted":
        document.title = "Shortlisted Candidates";
        break;
      case "rejected":
        document.title = "Rejected Candidates";
        break;
      default:
        document.title = "Page Not Found - Top Candidates";
    }
  }, [pathname]);

  return <></>;
};

export default DocumentTitle;
