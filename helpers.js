module.exports.authenticate = function(req) {
    if (req.session.currentUser != null) {
        return true;
    } else {
        return false;
    }
};

//MOST PROUD OF BIT OF CODE SO FAR!!!!!!
module.exports.canEdit = function(req, data) {
			//check the topic, if the creators is the current user, set the edit key to true, else false
            //let handlebars handle wether to show the edit button again or not!
            if (req.session.currentId == data.user.id) {
                data.topic.edit = true;

            } else {
                data.topic.edit = false;

            }

            //go through all the comments, if the current user is the editor, make edit=true;
            for (var i = 0; i < data.comments.length; i++) {
                if (req.session.currentId == data.comments[i].user_id) {
                    data.comments[i].edit = true;

                } else {
                    data.comments[i].edit = false;

                }
            }
};
