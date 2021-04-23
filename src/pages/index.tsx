import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { api } from "../services/api";
import { format, parseISO } from "date-fns";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeToString";
import styles from "./home.module.scss";

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  description: string;
  durationAsString: string;
  url: string;
  publishedAt: string;
};

type HomeProps = {
  lastedEpisodes: Episode[];
  allEpisodes: Episode[];
};

export default function Home({ lastedEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.lastestEpisodes}>
        <h2>Last releases </h2>

        <ul>
          {lastedEpisodes.map((episode) => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />

                <div className={styles.episodeDetails}>
                  <a href="">{episode.title}</a>
                  <p>{episode.members}</p>

                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button type="button">
                  <img src="./play-green.svg" alt="playbuttonep" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <table cellSpacing={0}>
          <thead>
            <th></th>
            <th>Podcast</th>
            <th>Members</th>
            <th>Date</th>
            <th>Duration</th>
            <td></td>
          </thead>

          <tbody>
            {allEpisodes.map(episode => {
              return (
                <tr>
                <td style= {{width: 100}}>
                  <Image width={120}
                  height={120}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                  />
                </td>

                <td>
                  <a href="">{episode.title}</a>
                </td>

                <td>{episode.members}</td>
                <td  style={{width: 100}}>{episode.publishedAt}</td>
                <td>{episode.durationAsString}</td>
                <td>
                  <button type="button">
                  <img src="./play-green.svg" alt="playbuttonep" />
                  </button>
                </td>
            </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy"),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });
  const lastedEpisodes = episodes.slice(0, 2);

  const allEpisodes = episodes.slice(2, episodes.lenght);

  return {
    props: {
      lastedEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
