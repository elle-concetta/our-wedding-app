import RootProvider from "src/providers";

import CaptureMoment from "./components/CaptureMoment";
import CoupleInformation from "./components/CoupleInformation";
import CoupleIntro from "./components/CoupleIntro";
import EventDate from "./components/EventDate";
import Footer from "./components/Footer";
import GalleryMoments from "./components/GalleryMoments";
import InvitationHero from "./components/InvitationHero";
import QuoteIntro from "./components/QuoteIntro";
import Reservation from "./components/Reservation/reservation";
import SinglePhoto from "./components/SinglePhoto";
import SendGift from "./components/SendGift";

const Landing = () => {
  return (
    <RootProvider>
      <InvitationHero />
      <CoupleIntro />
      <SinglePhoto />
      <QuoteIntro />
      <CoupleInformation />
      <EventDate />
      <GalleryMoments />
      <CaptureMoment />
      <Reservation />
      <SendGift />
      <Footer />
    </RootProvider>
  );
};

export default Landing;
