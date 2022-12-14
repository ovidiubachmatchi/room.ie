module.exports = {
    findCommonThings: (userData => {
      if(userData.userData.length !=0 && userData.usersToCompare.length !=0){
        let userToFindPartener = userData.userData[0].preference.split(',')
        const users = userData.usersToCompare.concat(userData.usersToCompare);
        const preferences = users.map((user) => ({
            id: user.id,
            preferences: user.preference.split(','),
        }));

        const userPreferences = preferences.reduce((dict, user) => {
            const { id, preferences } = user;
            dict[id] = preferences;
            return dict;
        }, {});

        const commonPreferencesCount = Object.keys(userPreferences).map((id) => {
            const userPreference = userPreferences[id];
            const commonPreference = userPreference.filter((preference) => userToFindPartener.includes(preference));
            return { id, count: commonPreference.length };
          });

          const countPerKey = Object.keys(userPreferences).map((id) => ({
            id,
            count: userPreferences[id].length,
          }));
        //how the structure looks
        console.log(userPreferences)
        console.log(userToFindPartener)
        console.log(commonPreferencesCount)
        console.log(countPerKey)

        return result = calculateTheProcentOfCommunPreference(commonPreferencesCount,countPerKey)
      }else{
        return result = "no users"
      }
    })

  }





const  calculateTheProcentOfCommunPreference = (commonPreferencesCount,usersPreferenceCount) =>{
    const result = {};

  for (const preference of commonPreferencesCount) {
    const key = usersPreferenceCount.find(k => k.id === preference.id);

    if (key) {
      result[preference.id] = preference.count / key.count * 100 +"%";
    }
  }

  return result;
}