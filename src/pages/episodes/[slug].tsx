import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeToString";


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
Episode: Episode[];
};

export default function Episode({episode}) {
  const router = useRouter();

  return <h1>{router.query.slug}</h1>;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), "d MMM yy"),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(
      Number(data.file.duration)
    ),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, //24hours
  };
};
