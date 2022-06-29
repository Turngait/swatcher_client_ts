import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "common": {
        "name": "Name",
        "email": "E-mail",
        "send": "Send",
        "save": "Save",
        "add": "Add",
        "edit": "Edit",
        "title": "Title",
        "description": "Description",
        "minimum": "Minimum",
        "low": "Low",
        "medium": "Medium",
        "high": "High",
        "highest": "Highest",
        "empty": "Empty"
      },
      "msgs": {
        "err1": "Something goes wrong. Please try again later"
      },
      "index": {
        "signin": "SignIn",
        "signUp": "SignUp",
        "email": "E-mail",
        "password": "Password",
        "restorePass": "Restore password",
        "noAccaunt": "Have no account?",
        "haveAccaunt": "Have an account?",
        "contactUs": "Contact Us",
        "policy": "Terms and Conditions",
        "desc1": "Press SignUp button you are agree with ",
        "welcome": "Welcome to SelfWatcher",
        "about1": "This application will allow you to keep track of the food you eat and your physical condition. All features are absolutely free. To start using it, you just need to register.",
        "about2": "But, remember - this application is not a substitute for the medical opinion of a specialist. It only allows you to keep statistics of your life.",
        //Restore pass
        "restorePassSuccess": "Password have been chenged",
        "enterEmail": "Enter your E-mail",
        "rstoreMsg": "Specret code have sent on your e-mail. Plese enter this code in field:",
        "enterSecretCode": "Enter secret code from E-mail",
        "enterNewPass": "Enter new password"
      },
      "menu": {
        "stats": "Statistics",
        "food": "Food",
        "health": "Health",
        "profile": "Profile",
        "logout": "Log out"
      },
      "stats": {
        "noData": "Empty now. Please add some elements in in relevant sections",
        "emptyHere": "Empty here",
        //First setup modal
        "fillData": "Add your data please",
        "fsSetSex": "Your sex",
        "fsMan": "Male",
        "fsWoman": "Female",
        "fsOther": "Other",
        "fsYourWeight": "Your weight",
        "fsYourHeight": "Your hight",
        "fsYourAge": "Your age",
        "statByDays": "Statistics by days",
      },
      "foods": {
        "food": "Food",
        "allMyFood": "All my food",
        "allMyFoodEmpty": "You have not added any food yet",
        "addFood": "Add Food",
        "kkl": "kkl",
        "statByDaysNoFood": "Statistics is empty. you can add food for day by clicking 'Add' button at the bottom",
        //Modals
        "mAddFood": "Add food",
        "mCalories": "Calories",
        "mUnits": "Units (kg, litres, etc)",
        "mHarmulness": "Harmfulness",
        "mAddFoodForDay": "Add food for day",
        "mChooseDay": "Choose a day",
        "mChooseFood": "Choose food",
        "mChooseTime": "Choose time",
        "mAmount": "Amount",
        "mAdditionalInfo": "Additional info (optional)"
      },
      "health": {
        "health": "Health",
        "noIllnessByDay": "You has not added any illness yet",
        "allIllness": "All illness",
        "newIllness": "New illness",
        "allMyIllnessEmpty": "You have not added any illness yet",
        "emptyIllnessByDay": "Statistics is empty. you can add illness for day by clicking 'Add' button at the bottom",
        //Modals
        "mNewIllnessForDay": "New illness for day",
        "mChooseDay": "Choose a day",
        "mChooseIllness": "Choose Illness",
        "mChoosePower": "Choose power",
        "mDurationInHours": "Duration in hours",
        "mChooseTime": "Choose start time",
        "mAdditionalInfo": "Additional info (optional)",
        "mAddIllness": "Add illness",
        "mChooseDanger": "Choose danger"
      },
      "profile": {
        "profile": "Profile",
        "nameIsChanged": "Name is changed",
        "passIsChanged": "Password is changed",
        "dataIsChanged": "Data is changed",
        "changeName": "Change name",
        "yourName": "Your name",
        "changePass": "Change password",
        "yourOldPass": "Your old password",
        "yourNewPass": "Your new password",
        "yourData": "Your data",
        "yourWeight": "Your weight",
        "yourHeight": "Your height",
        "yourAge": "Your age"
      }
    }
  },
};

i18n
.use(initReactI18next) 
.init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
