import ModernAbout from "./ModernAbout";
import AboutCTA from "./AboutCTA ";

const AboutPage = () => {
  return (
    <>
      <ModernAbout />
      {/* 💡 NOTE: This CTA Section is already dark by design and works well in both modes. No changes are needed. */}
      <AboutCTA></AboutCTA>
    </>
  );
};

export default AboutPage;
