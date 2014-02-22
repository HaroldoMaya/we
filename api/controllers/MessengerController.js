/**
 * MessengerController
 *
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function (req,res) {

    var format = 'json';
    if(req.param('format')){
      format = req.param('format');
    }

    Messages.find({})
    .limit(10)
    .sort('createdAt ASC')
    .done(function(err, messages) {

      // Error handling
      if (err) {
        return console.log(err);
      }
      // Found multiple messages!
      if (messages) {

        if(format == 'json'){
          res.json({
            messages: messages
          });
        } else {
          res.view({
            messages: messages
          });
        }
      }
    });
  },

  // add message
  create: function (req, res, next) {
    var message = {};
    message.content = req.param("content");
    message.fromId = req.param("fromId");
    message.toId = req.param("toId");

    Messages.create(message).done(function (error, newMessage){
      if (error) {
        console.log(error);
        res.send(500, {error: res.i18n("DB Error") });
      } else {

        if(req.isSocket){
          sails.io.sockets.in('user_' + newMessage.toId[0]).emit(
            'receive:message',
            {
              message: newMessage
            }
          );
        } else {
          res.send({
            message: newMessage
          });
        }

      }
    });
  },

  /**
   * Start messenger
   */
  start: function(req, res){
    if(!req.user) res.forbidden('forbidden');

    res.send(200,'');
    // TODO change to send to friends
    sails.io.sockets.in('global').emit('contact:connect', {
      status: 'connected',
      contact: req.user.toJSON()
    });
  },

  /**
   * Get contact list
   * TODO add suport to friends and roons
   */
  getContactList: function (req, res, next){
    var friendList = {};
    // get contact/frinend list
    friendList = sails.util.clone(sails.onlineusers);

    // remove current user from list
    delete(friendList[req.user.id]);

    res.send(
      {
        friendList: friendList
      }
    );
  }
};
