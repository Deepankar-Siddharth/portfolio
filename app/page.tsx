import Hero from "@/components/hero";
import Intro from "@/components/intro";
import Work from "@/components/work";
import Build from "@/components/build";
import Stack from "@/components/stack";
import GithubSection from "@/components/github-section";
import Journey from "@/components/journey";
import AboutSection from "@/components/about";
import Contact from "@/components/contact";
import { getGithubOverview } from "@/lib/github";

export default async function Home() {
  const github = await getGithubOverview();

  const heroStats = github.user
    ? {
        repositories: github.user.public_repos,
        followers: github.user.followers,
        following: github.user.following,
stars: github.stars,
        forks: github.forks,
        since: github.user.created_at
          ? String(new Date(github.user.created_at).getFullYear())
          : "",
      }
    : null;

  return (
    <>
      <Hero stats={heroStats} />
      <Intro />
      <Work />
      <Build />
      <Stack />
      <GithubSection />
      <Journey />
      <AboutSection />
      <Contact />
    </>
  );
}