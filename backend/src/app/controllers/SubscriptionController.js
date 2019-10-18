import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import Queue from '../../lib/Queue';
import User from '../models/User';

// jobs
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    // Verify if meetup exists
    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    // Verify if user is the owner of meetup
    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "You can't subscribe in your own meetup" });
    }

    // Verify if meetup has done
    if (meetup.past) {
      return res.status(400).json({ error: 'Sorry, this meetup has done' });
    }

    // Verify if user has already subscribed in this meetup
    const subscribed = await Subscription.findOne({
      where: {
        meetup_id: req.params.id,
        user_id: req.userId,
      },
    });

    if (subscribed) {
      return res
        .status(400)
        .json({ error: 'You already has subscribed in this meetup' });
    }

    // Verify if meetup has the same date
    const sameDate = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (sameDate) {
      return res
        .status(400)
        .json({ error: 'You already subscribed in one meetup with this date' });
    }

    // Buscar o usuário que vai ser inscrito
    // posso melhorar?
    const subscribedUser = await Subscription.findOne({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    const { id, meetup_id, user_id } = await Subscription.create({
      meetup_id: req.params.id,
      user_id: req.userId,
    });

    await Queue.add(SubscriptionMail.key, {
      subscribedUser,
      meetup,
    });

    return res.json({ id, meetup_id, user_id });
  }
}

export default new SubscriptionController();
