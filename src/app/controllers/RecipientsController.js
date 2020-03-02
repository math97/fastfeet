import recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const recipient = req.body;

    // if (recipient === (await recipients.findOne({ where: { recipient } })))
    //   return res.status(401).json({ error: 'Recipient already exist' });

    await recipients.create(recipient);

    const { name, cep } = recipient;

    return res.status(200).json({
      message: 'Recipent created',
      recipient: {
        name,
        cep,
      },
    });
  }
}

export default new RecipientsController();
