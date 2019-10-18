import {
  parseISO,
  startOfHour,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';
import * as Yup from 'yup';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const where = {};

    // if the user is filtering for dates
    if (req.query.date) {
      const parseDate = parseISO(req.query.date);
      where.date = {
        [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
      };
    }

    // 10 meetups per page and order by date
    const meetups = await Meetup.findAll({
      where,
      attributes: ['past', 'title', 'description', 'localization', 'date'],
      limit: 10,
      offset: (page - 1) * 10,
      order: ['date'],
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      localization: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const hourStart = startOfHour(parseISO(req.body.date));

    // Verify if is a past date
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Date invalid' });
    }

    // verify if user has already created a meetup with this date
    const meetup = await Meetup.findOne({
      where: {
        user_id: req.userId,
        date: parseISO(req.body.date),
      },
    });

    if (meetup) {
      return res
        .status(400)
        .json({ error: 'You already have an meetup with this date' });
    }

    // create new meetup
    const newMeetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(newMeetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      localization: Yup.string(),
      date: Yup.date(),
      banner_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const meetup = await Meetup.findByPk(req.params.id);

    // Verify if is a meetup owner
    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'Permission denied' });
    }

    // Verify if is a past date
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Date invalid' });
    }

    // verify if this meetup has happened
    if (meetup.past) {
      return res.status(400).json({ error: 'This meetup already happened' });
    }

    const meetupUpdated = await meetup.update(req.body);

    return res.json(meetupUpdated);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'Permission denied' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: 'This meetup already happened' });
    }

    // delete meetup from database
    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
