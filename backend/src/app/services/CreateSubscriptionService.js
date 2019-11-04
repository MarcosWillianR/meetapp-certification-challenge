import Queue from '../../lib/Queue';

import SubscriptionMail from '../jobs/SubscriptionMail';

import User from '../models/User';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

class CreateSubscriptionService {
  async run({ user_id, meetup_params_id }) {
    const meetup = await Meetup.findByPk(meetup_params_id, {
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    // Verify if meetup exists
    if (!meetup) {
      throw new Error('Meetup not found');
    }

    // Verify if user is the owner of meetup
    if (meetup.user_id === user_id) {
      throw new Error("You can't subscribe in your own meetup");
    }

    // Verify if meetup has done
    if (meetup.past) {
      throw new Error('Sorry, this meetup has done');
    }

    // Verify if user has already subscribed in this meetup
    const subscribed = await Subscription.findOne({
      where: {
        meetup_id: meetup_params_id,
        user_id,
      },
    });

    if (subscribed) {
      throw new Error('You already has subscribed in this meetup');
    }

    // Verify if meetup has the same date
    const sameDate = await Subscription.findOne({
      where: {
        user_id,
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
      throw new Error('You already subscribed in one meetup with this date');
    }

    // Buscar o usuário que vai ser inscrito
    // posso melhorar?
    const subscribedUser = await Subscription.findOne({
      where: {
        user_id,
      },
      include: [
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    const newSubsCription = await Subscription.create({
      meetup_id: meetup_params_id,
      user_id,
    });

    await Queue.add(SubscriptionMail.key, {
      subscribedUser,
      meetup,
    });

    return newSubsCription;
  }
}

export default new CreateSubscriptionService();
