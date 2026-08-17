import Hero from "@/components/hero";
import Intro from "@/components/intro";
import Work from "@/components/work";
import Build from "@/components/build";
import Stack from "@/components/stack";
import GithubSection from "@/components/github-section";
import Journey from "@/components/journey";
import AboutSection from "@/components/about";
import Contact from "@/components/contact";
import ThreeElement from "@/components/three-element";
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
      {/* Ambient 3D accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-6 right-6 z-20 hidden h-40 w-40 md:block lg:h-52 lg:w-52"
      >
        <ThreeElement />
      </div>
    </>
  );
}