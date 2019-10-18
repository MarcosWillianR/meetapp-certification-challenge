import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class OrganizerController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      attributes: [
        'past',
        'id',
        'title',
        'description',
        'localization',
        'date',
      ],
      include: [
        {
          model: File,
          attributes: ['name', 'path', 'url'],
        },
        {
          model: User,
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!meetups.length) {
      return res.json({ message: 'You are not organizing any Meetup' });
    }

    return res.json(meetups);
  }
}

export default new OrganizerController();
