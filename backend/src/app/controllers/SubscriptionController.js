import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

import CreateSubscriptionService from '../services/CreateSubscriptionService';
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
    const subscription = await CreateSubscriptionService.run({
      user_id: req.userId,
      meetup_params_id: req.params.id
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
