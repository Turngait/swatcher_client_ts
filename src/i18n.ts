import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "common": {
        "name": "Name",
        "email": "E-mail",
        "send": "Send",
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
        "profile": "Profile"
      },
      "stats": {
        "noData": "Empty now. Please add some elements in in relevant sections"
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
