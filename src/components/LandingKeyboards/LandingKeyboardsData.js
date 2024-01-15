import Img from 'assets/images/mac-device.png'
import Google from 'assets/images/google.png'
import AppStore from 'assets/images/app-store.svg'
import FVKeyboards from 'assets/images/fv-keyboards-border.png'
import BG from 'assets/images/landing-keyboard-bg.png'

function LandingKeyboardsData() {
  const data = {
    settings: {
      mobileText: 'Type in your language using',
      google: Google,
      appStore: AppStore,
      fvKeyboards: FVKeyboards,
      bg: BG,
      image: Img,
      title: 'FIRSTVOICES KEYBOARDS',
      text: 'FirstVoices keyboards have been developed for both desktop and mobile devices, with over 100 Indigenous language keyboards currently available. Users are able to select their keyboard(s) of choice within their email, social media, word processing or other apps, enabling unlimited communication in their mother language.',
      url: '/keyboards',
      urlLabel: 'Learn more',
    },
  }
  return data
}

export default LandingKeyboardsData
