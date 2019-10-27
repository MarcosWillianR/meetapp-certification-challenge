import produce from 'immer';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const INITIAL_STATE = {
  meetups: null,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@Meetup/MEETUP_SUCCESS': {
        draft.meetups = action.payload.meetup;
        break;
      }
      case '@meetup/GET_SUCCESS': {
        const meetupsFormatted = action.payload.meetups.map(m => {
          const compareDate = utcToZonedTime(m.date, timezone);

          const dateFormatted = format(compareDate, "d 'de' MMMM', às' H'h'", {
            locale: pt,
          });

          const { url, name } = m.File;

          return {
            date: m.date,
            dateFormatted,
            photo: url,
            photoName: name,
            id: m.id,
            title: m.title,
            description: m.description,
            localization: m.localization,
            past: m.past,
          };
        });

        draft.meetups = meetupsFormatted;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.meetups = null;
        break;
      }
      default:
    }
  });
}
