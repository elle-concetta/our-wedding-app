import { useEffect, useRef } from "react";

import { useInView, a } from "@react-spring/web";
import { atcb_action } from "add-to-calendar-button";
import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { animLeftToRight, animRightToLeft } from "src/constants/animation";
import { track } from "src/helpers/trackers";

import { EventDate } from "../types";

interface EventCardProps {
  date: EventDate;
  index: number;
}

const EventCard = (props: EventCardProps) => {
  const { date, index } = props;

  const [ref, springs] = useInView(
    index % 2 === 0 ? animRightToLeft : animLeftToRight
  );

  const buttonAddCalendarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonAddCalendarRef.current) {
      const config = {
        name: `Wedding Events - ${date.title}`,
        description: `[h1]${
          date.title
        } Event[/h1][p]Join us as we celebrate a love that’s blossomed into forever – we’re tying the knot and can’t wait to share this magical day with you. You are cordially invited![/p][br][p]Place: ${
          date.vendorName ? `${date.vendorName} - ` : ""
        }${date.place}${
          date.note ? `[p]${date.note}[/p]` : ""
        }[/p][p]Google map: [url]${
          date.mapLink
        }[/url][/p][p]Online invitation: [url]${window.location.href}[/url][/p]
        `,
        options: ["Google", "Outlook.com", "Apple"] as any,
        location: date.mapLink,
        startDate: date.rawDate.startDate,
        startTime: date.rawDate.startTime,
        endTime: date.rawDate.endTime,
        timeZone: "America/New_York",
      };

      buttonAddCalendarRef.current.addEventListener("click", () => {
        track("click", {
          name: "add to calendar",
          event: date.title,
        });

        atcb_action(config, buttonAddCalendarRef.current as any);
      });
    }
  }, [
    date.mapLink,
    date.note,
    date.place,
    date.rawDate.endTime,
    date.rawDate.startDate,
    date.rawDate.startTime,
    date.title,
    date.vendorName,
  ]);

  return (
    <a.div ref={ref} style={springs} className="dates">
      <div className="image-slider">
        <Swiper
          className="slider"
          modules={[Autoplay, EffectFade]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect={"fade"}
          fadeEffect={{ crossFade: true }}
          speed={1600}
          loop={true}
        >
          {date.images.map((image, idx) => (
            <SwiperSlide key={`couple-intro-${idx}`}>
              <img className="image" src={image} alt="" loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="description">
        <div className="description-content">
          <h2 className="title">{date.title}</h2>

          <div>
            <div className="dates-wrapper">
              <div className="dates-cal">
                <p className="dates-date">{date.whenDate}</p>
                <p className="dates-month">{date.whenMonth}</p>
              </div>
              <div>
                <p className="when">{date.when}</p>
                <p className="time">{date.time}</p>
              </div>
            </div>
            {date.dresscode && <p className="dresscode">{date.dresscode}</p>}
          </div>

          <div>
            {Boolean(date.vendorName) && (
              <p className="vendor">{date.vendorName}</p>
            )}{" "}
            <p className="place">{date.place}</p>
            <p className="note">{date.note}</p>
          </div>

          <div>
            <a href={date.mapLink} target="_blank" rel="noreferrer">
              <p>open google map</p>
            </a>
          </div>

          <div>
            <button ref={buttonAddCalendarRef} className="atc" type="button">
              add to calendar
            </button>
          </div>
        </div>
        <div className="description-date">
          <p dangerouslySetInnerHTML={{ __html: date.dateVertical }} />
        </div>
      </div>
    </a.div>
  );
};

export default EventCard;
