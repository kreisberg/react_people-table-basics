import { Loader } from "../components/Loader";
import { getPeople } from "../api";
import { Person } from "../types";
import { useEffect, useState } from "react";

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorNotif, setIsErrorNotif] = useState(false);

  const loadingPeople = async () => {
    try {
      setIsLoading(true);

      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    } catch {
      setIsErrorNotif(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadingPeople();
  }, []);

  const hasNobody = !isLoading && !people.length;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">

        <div className="box table-container">
          {isLoading && <Loader />}
          {isErrorNotif && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {hasNobody && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
