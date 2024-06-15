const User = require("../model/User")// User 모델을 가져옵니다.

const updateExistingUsers = async () => {
    try {
        // 모든 사용자 데이터를 업데이트합니다.
        await User.updateMany(
            {}, 
            { 
                $set: {
                    activityName: "", 
                    address: {
                        firstName: "",
                        lastName: "",
                        contact: "",
                        address: "",
                        city: "",
                        zip: ""
                    }
                }
            },
            { multi: true }
        );
        console.log('All users have been updated with activityName and address fields.');
    } catch (error) {
        console.error('Error updating users:', error);
    }
};

module.exports = updateExistingUsers;
