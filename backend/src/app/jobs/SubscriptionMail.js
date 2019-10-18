import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, subscribedUser } = data;

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: 'Nova inscrição de Meetup',
      template: 'subscriptions',
      context: {
        organizer: meetup.User.name,
        user: subscribedUser.User.name,
        email: subscribedUser.User.email,
      },
    });
  }
}

export default new SubscriptionMail();
