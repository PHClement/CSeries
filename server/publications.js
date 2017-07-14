// User

Meteor.publish("userStatus", function () {
    Meteor._sleepForMs(500);
    return Meteor.users.find({"status.online": true});
});

Meteor.publish('users', function () {
    Meteor._sleepForMs(500);
    return Meteor.users.find();
});

Meteor.publish('usersActivated', function () {
    Meteor._sleepForMs(500);
    return Meteor.users.find({'activated': true});
});

Meteor.methods({
    'checkUserExist': function(id) {
        var userCount = Meteor.users.find({facebook_id: id}).count();
        return userCount != 0;
    },
    'countUser': function() {
        return Meteor.users.count();
    },
    'user.activate': function(id) {
        if(!Meteor.userId()) throw new Meteor.Error('not-logged', 'Vous n\'êtes pas connecté !');

        var permission = Meteor.users.findOne({_id:Meteor.userId()}).profile.permission;
        if(permission < 4) throw new Meteor.Error('not-logged', 'Vous n\'avez pas les permissions !');

        Meteor.users.update(id, { $set: { 'profile.enabled': true } }, function(error, affectedDocs) {
            if (error) {
                throw new Meteor.Error('not-logged', error.message);
            } else {
                return "Update Successful";
            }
        });
    },
    'user.desactivate': function(id) {
        if(!Meteor.userId()) throw new Meteor.Error('not-logged', 'Vous n\'êtes pas connecté !');

        var permission = Meteor.users.findOne({_id:Meteor.userId()}).profile.permission;
        if(permission < 4) throw new Meteor.Error('not-logged', 'Vous n\'avez pas les permissions !');

        Meteor.users.update(id, { $set: { 'profile.enabled': false } }, function(error, affectedDocs) {
            if (error) {
                throw new Meteor.Error('not-logged', error.message);
            } else {
                return "Update Successful";
            }
        });
    }
});

// Series

Meteor.publish('seriesGet', function () {
    Meteor._sleepForMs(500);
    return series.find({});
});