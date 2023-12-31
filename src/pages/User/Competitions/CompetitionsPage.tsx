import { useQuery } from "@tanstack/react-query";
import CompetitionCard from "./CompetitionCard";
import styles from "./Competitions.module.scss";
import { ResponseCompetitions } from "../../../types/competitie";

const CompetitionsPage = () => {
  const competitionQuery = useQuery<ResponseCompetitions, Error>({
    queryKey: ["competitions"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/competitii`).then(
        (response) => {
          console.log(response);
          if (!response.ok) throw new Error();
          return response.json();
        }
      ),
    staleTime: 1000 * 60 * 5,
    // refetchInterval: 1000,
  });

  if (competitionQuery.isLoading) return <h1>Loading</h1>;
  if (competitionQuery.isError) return <h1> Error</h1>;

  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Competiti active</h2>
        <div className={styles.competitions}>
          {competitionQuery.data?.data.competitions
            .filter((competition) => competition.activaFlag)
            .map((competition) => (
              <CompetitionCard
                key={competition._id}
                competition={competition}
              />
            ))}
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Competiti finalizate</h2>
        <div className={styles.competitions}>
          {competitionQuery.data?.data.competitions
            .filter((competition) => !competition.activaFlag)
            .map((competition) => (
              <CompetitionCard
                key={competition._id}
                competition={competition}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default CompetitionsPage;
